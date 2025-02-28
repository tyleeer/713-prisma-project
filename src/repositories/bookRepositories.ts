import { PrismaClient } from '@prisma/client';
import { BookQueriesParams } from '../models/types';

const prisma = new PrismaClient();

export function getAllBooks() {
    return prisma.book.findMany({
        select: {
            id: true,
            title: true,
            isbn: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    organization: {
                        select: {
                            organizationName: true
                        }
                    }
                }
            },
            bookCategories: {
                select: {
                    category: {
                        select: {
                            categoryName: true
                        }
                    }
                }
            }
        }
    });
}

export function getFilteredBooks(params: BookQueriesParams) {
    const whereConditions: any = {};
    const borrowingDetailsConditions: any[] = [];
    const othersSelected: any = {};

    // Title filter
    if (params.title !== null && params.title !== "") {
        whereConditions.title = {
            contains: params.title.toLowerCase()
        };
    }

    // Due date filter
    if ([params.dueDateStart, params.dueDateEnd].every(param => param !== null)) {
        borrowingDetailsConditions.push(
            {
                dueDate: {
                    gte: params.dueDateStart,
                    lt: params.dueDateEnd
                }
            },
            {
                returnDate: {
                    equals: null
                }
            }
        );
    }

    // Only add borrowingDetails filter if we have any conditions
    if (borrowingDetailsConditions.length > 0) {
        whereConditions.borrowingDetails = {
            every: {
                AND: borrowingDetailsConditions
            }
        };

        othersSelected.borrowingDetails = {
            select: {
                dueDate: true,
                returnDate: true
            }
        };
    }

    return prisma.book.findMany({
        where: whereConditions,
        select: {
            id: true,
            title: true,
            isbn: true,
            ...othersSelected
        }
    });
}