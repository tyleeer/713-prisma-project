import { PrismaClient } from '@prisma/client';
import {
    createOrganizations,
    createAuthors,
    createCategories,
    createBooks,
    createMembers,
    createBorrowings
} from './seedFunctions';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seeding for Chiang Mai University Library...');

    try {
        await createOrganizations(prisma);
        await createAuthors(prisma);
        await createCategories(prisma);
        await createBooks(prisma);
        await createMembers(prisma);
        await createBorrowings(prisma);

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .then(() => {
        console.log('Seed script execution completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seed script execution failed:', error);
        process.exit(1);
    });