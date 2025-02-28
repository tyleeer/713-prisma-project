import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function getAllAuthors() {
    return prisma.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            organization: {
                select: {
                    organizationName: true
                }
            }
        }
    });
}