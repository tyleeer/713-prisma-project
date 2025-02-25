import { PrismaClient } from '@prisma/client';
import { organizations } from '../mocks/organizationData';
import { authors } from '../mocks/authorData';
import { categories } from '../mocks/categoryData';
import { books } from '../mocks/bookData';
import { members } from '../mocks/memberData';
import { borrowings } from '../mocks/borrowingData';

export async function createOrganizations(prisma: PrismaClient): Promise<void> {
    console.log('Seeding organizations...');

    for (const org of organizations) {
        await prisma.organization.create({
            data: {
                organizationName: org.organizationName
            }
        });
    }

    console.log(`Created ${organizations.length} organizations`);
}

export async function createAuthors(prisma: PrismaClient): Promise<void> {
    console.log('Seeding authors...');

    for (const author of authors) {
        let organizationId = undefined;

        // Find organization ID by name if specified
        if (author.organizationName) {
            const organization = await prisma.organization.findFirst({
                where: { organizationName: author.organizationName }
            });

            if (organization) {
                organizationId = organization.id;
            }
        }

        await prisma.author.create({
            data: {
                firstName: author.firstName,
                lastName: author.lastName,
                organizationId: organizationId
            }
        });
    }

    console.log(`Created ${authors.length} authors`);
}

export async function createCategories(prisma: PrismaClient): Promise<void> {
    console.log('Seeding categories...');

    for (const category of categories) {
        await prisma.category.create({
            data: {
                categoryName: category.categoryName
            }
        });
    }

    console.log(`Created ${categories.length} categories`);
}

export async function createBooks(prisma: PrismaClient): Promise<void> {
    console.log('Seeding books and book categories...');

    for (const book of books) {
        // Find author by name
        const author = await prisma.author.findFirst({
            where: {
                firstName: book.authorName.split(' ')[0],
                lastName: book.authorName.split(' ')[1]
            }
        });

        if (!author) {
            console.warn(`Author ${book.authorName} not found, skipping book ${book.title}`);
            continue;
        }

        // Create the book
        const createdBook = await prisma.book.create({
            data: {
                title: book.title,
                isbn: book.isbn,
                authorId: author.id
            }
        });

        // Create book category relationships
        for (const categoryName of book.categories) {
            // Find category by name
            const category = await prisma.category.findUnique({
                where: { categoryName }
            });

            if (!category) {
                console.warn(`Category ${categoryName} not found, skipping for book ${book.title}`);
                continue;
            }

            await prisma.bookCategory.create({
                data: {
                    bookId: createdBook.id,
                    categoryId: category.id
                }
            });
        }
    }

    console.log(`Created ${books.length} books with their category relationships`);
}

export async function createMembers(prisma: PrismaClient): Promise<void> {
    console.log('Seeding members...');

    for (const member of members) {
        await prisma.member.create({
            data: {
                memberCode: member.memberCode,
                firstName: member.firstName,
                lastName: member.lastName,
                phone: member.phone
            }
        });
    }

    console.log(`Created ${members.length} members`);
}

export async function createBorrowings(prisma: PrismaClient): Promise<void> {
    console.log('Seeding borrowings and borrowing details...');

    for (const borrowing of borrowings) {
        // Find member by memberCode
        const member = await prisma.member.findUnique({
            where: { memberCode: borrowing.memberCode }
        });

        if (!member) {
            console.warn(`Member ${borrowing.memberCode} not found, skipping borrowing record`);
            continue;
        }

        // Create the borrowing record
        const createdBorrowing = await prisma.borrowing.create({
            data: {
                memberId: member.id,
                borrowDate: borrowing.borrowDate
            }
        });

        // Create borrowing details
        for (const detail of borrowing.borrowingDetails) {
            // Find book by ISBN
            const book = await prisma.book.findUnique({
                where: { isbn: detail.isbn }
            });

            if (!book) {
                console.warn(`Book with ISBN ${detail.isbn} not found, skipping borrowing detail`);
                continue;
            }

            await prisma.borrowingDetail.create({
                data: {
                    borrowingId: createdBorrowing.id,
                    bookId: book.id,
                    dueDate: detail.dueDate,
                    returnDate: detail.returnDate
                }
            });
        }
    }

    console.log(`Created ${borrowings.length} borrowings with their details`);
}