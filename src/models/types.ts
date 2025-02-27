import { ParsedQs } from 'qs';

export interface CustomError extends Error {
    status?: number;
}

export interface Organization {
    organizationName: string;
}

export interface Author {
    firstName: string;
    lastName: string;
    organizationName?: string; // Will be linked to Organization
}

export interface Category {
    categoryName: string;
}

export interface Book {
    title: string;
    isbn: string;
    authorName: string; // Format: "firstName lastName" to link to Author
    categories: string[]; // Array of category names to link
}

export interface Member {
    memberCode: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface Borrowing {
    memberCode: string; // To link with Member
    borrowDate: Date;
    borrowingDetails: BorrowingDetail[];
}

export interface BorrowingDetail {
    isbn: string; // To link with Book
    dueDate: Date;
    returnDate?: Date; // Optional, null if not returned yet
}

export interface BookQueriesParamsExpress {
    title: string | ParsedQs | (string | ParsedQs)[] | undefined;
    dueDate: string | ParsedQs | (string | ParsedQs)[] | undefined;
    isReturned: string | ParsedQs | (string | ParsedQs)[] | undefined;
}
export interface BookQueriesParams {
    title: string | null;
    dueDateStart: Date | null;
    dueDateEnd: Date | null;
}