import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function getAllMembers(sort: string | null) {

    const ordering: any = {};

    switch (sort) {
        case "title":
            ordering.orderBy = {
                firstName: "asc"
            };
            break;
        case "memberCode":
            ordering.orderBy = {
                memberCode: "asc"
            };
            break;
    }

    return prisma.member.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            memberCode: true,
            phone: true,
            borrowings: {
                select: {
                    borrowDate: true,
                    borrowingDetails: {
                        select: {
                            book: {
                                select: {
                                    title: true
                                }
                            },
                            dueDate: true,
                            returnDate: true
                        }
                    }
                }

            }
        },
        ...ordering
    });
}