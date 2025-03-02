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

type QueryParam = string | ParsedQs | (string | ParsedQs)[];

export interface BookQueriesParamsExpress {
    title?: QueryParam;
    dueDate?: QueryParam;
    isReturned?: QueryParam;
    pageSize: number;
    pageNo: number;
    keyword?: QueryParam;
}
export interface BookQueriesParams {
    title?: string;
    dueDateStart?: Date;
    dueDateEnd?: Date;
    pageSize: number;
    pageNo: number;
    keyword?: string;
}