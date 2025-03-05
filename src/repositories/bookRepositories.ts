import { PrismaClient } from '@prisma/client';
import { BookQueriesParams } from '../models/types';

const prisma = new PrismaClient();

export async function getAllBooks(params: BookQueriesParams) {
    const { pageNo, pageSize } = params;

    const books = await prisma.book.findMany({
        skip: (pageNo - 1) * pageSize,
        take: pageSize,
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

    const totalBooks = await prisma.book.count();

    return { totalBooks, books };
}

export async function getFilteredBooks(params: BookQueriesParams) {
    const { title, dueDateEnd, dueDateStart, keyword, pageNo, pageSize } = params;
    const borrowingDetailsConditions: any[] = [];
    const select: any = {
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
        },
        borrowingDetails: {
            select: {
                borrowing: {
                    select: {
                        member: {
                            select: {
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                }
            }
        }
    };

    let where: any = {};

    // Title filter
    if (title && title !== "") {
        where.title = {
            contains: title.toLowerCase()
        };
    }

    // Due date filter
    if ([dueDateStart, dueDateEnd].every(param => param != undefined)) {
        borrowingDetailsConditions.push(
            {
                dueDate: {
                    gte: dueDateStart,
                    lt: dueDateEnd
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
        where.borrowingDetails = {
            every: {
                AND: borrowingDetailsConditions
            }
        };

        select.borrowingDetails = {
            select: {
                dueDate: true,
                returnDate: true
            }
        };
    }

    if (keyword && keyword != "") {
        where = {
            ...where,
            OR: [
                {
                    title: {
                        contains: keyword
                    }
                },
                {
                    bookCategories: {
                        some: {
                            category: {
                                categoryName: {
                                    contains: keyword
                                }
                            }
                        },
                    },
                },
                {
                    author: {
                        OR: [
                            {
                                firstName: {
                                    contains: keyword
                                }
                            },
                            {
                                lastName: {
                                    contains: keyword
                                }
                            }
                        ],
                    }
                },
                {
                    borrowingDetails: {
                        some: {
                            borrowing: {
                                member: {
                                    OR: [
                                        {
                                            firstName: {
                                                contains: keyword
                                            }
                                        },
                                        {
                                            lastName: {
                                                contains: keyword
                                            }
                                        }
                                    ],
                                }
                            }
                        },
                    },
                }
            ],
        };
    }

    const books = await prisma.book.findMany({
        skip: (pageNo - 1) * pageSize,
        take: pageSize,
        where,
        select
    });

    const totalBooks = await prisma.book.count({ where });

    return { totalBooks, books };
}