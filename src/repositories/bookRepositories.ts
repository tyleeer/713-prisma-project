import { PrismaClient } from '@prisma/client';
import { BookQueriesParams } from '../models/types';

const prisma = new PrismaClient();

export function getAllBooks() {
    return prisma.book.findMany();
}

export function getFilteredBooks(params: BookQueriesParams) {
    const whereConditions: any = {};
    const borrowingDetailsConditions: any[] = [];
    const includedData: any = {};

    // Title filter
    if (params.title !== null && params.title !== "") {
        whereConditions.title = {
            contains: params.title.toLowerCase()
        };
    }

    // Return status filter
    if (params.isReturned !== null) {
        borrowingDetailsConditions.push({
            returnDate: params.isReturned ? {
                not: null
            } : {
                equals: null
            }
        });
    }

    // Due date filter
    if (params.dueDate !== null) {
        borrowingDetailsConditions.push({
            dueDate: {
                lt: params.dueDate
            }
        });
    }

    // Only add borrowingDetails filter if we have any conditions
    if (borrowingDetailsConditions.length > 0) {
        whereConditions.borrowingDetails = {
            some: {
                AND: borrowingDetailsConditions
            }
        };

        includedData.borrowingDetails = true;
    }

    return prisma.book.findMany({
        where: whereConditions,
        include: includedData
    });
}