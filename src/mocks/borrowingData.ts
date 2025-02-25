import { Borrowing } from '../models/types';

// Helper to generate dates (n days ago from today)
const daysAgo = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

// Helper to generate a future date (n days from today)
const daysFromNow = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

export const borrowings: Borrowing[] = [
    {
        memberCode: "631001001",
        borrowDate: daysAgo(20),
        borrowingDetails: [
            {
                isbn: "9786167825403",
                dueDate: daysAgo(6),
                returnDate: daysAgo(8) // Returned 2 days early
            },
            {
                isbn: "9786168543214",
                dueDate: daysAgo(6),
                returnDate: daysAgo(8)
            }
        ]
    },
    {
        memberCode: "631001002",
        borrowDate: daysAgo(18),
        borrowingDetails: [
            {
                isbn: "9786161843373",
                dueDate: daysAgo(4),
                returnDate: daysAgo(5)
            }
        ]
    },
    {
        memberCode: "631001003",
        borrowDate: daysAgo(15),
        borrowingDetails: [
            {
                isbn: "9786168221235",
                dueDate: daysAgo(1),
                returnDate: daysAgo(2)
            },
            {
                isbn: "9786167854113",
                dueDate: daysAgo(1),
                returnDate: daysAgo(2)
            },
            {
                isbn: "9786164580336",
                dueDate: daysAgo(1),
                returnDate: daysAgo(2)
            }
        ]
    },
    {
        memberCode: "641001001",
        borrowDate: daysAgo(12),
        borrowingDetails: [
            {
                isbn: "9786162825842",
                dueDate: daysFromNow(2),
                returnDate: undefined // Not yet returned
            }
        ]
    },
    {
        memberCode: "641001002",
        borrowDate: daysAgo(10),
        borrowingDetails: [
            {
                isbn: "9786167892542",
                dueDate: daysFromNow(4),
                returnDate: undefined
            },
            {
                isbn: "9786165478932",
                dueDate: daysFromNow(4),
                returnDate: undefined
            }
        ]
    },
    {
        memberCode: "641001003",
        borrowDate: daysAgo(8),
        borrowingDetails: [
            {
                isbn: "9786162584397",
                dueDate: daysFromNow(6),
                returnDate: undefined
            }
        ]
    },
    {
        memberCode: "651001001",
        borrowDate: daysAgo(7),
        borrowingDetails: [
            {
                isbn: "9786168732540",
                dueDate: daysFromNow(7),
                returnDate: undefined
            },
            {
                isbn: "9786165721043",
                dueDate: daysFromNow(7),
                returnDate: undefined
            }
        ]
    },
    {
        memberCode: "651001002",
        borrowDate: daysAgo(5),
        borrowingDetails: [
            {
                isbn: "9786169258735",
                dueDate: daysFromNow(9),
                returnDate: undefined
            }
        ]
    },
    {
        memberCode: "631001004",
        borrowDate: daysAgo(3),
        borrowingDetails: [
            {
                isbn: "9786163982567",
                dueDate: daysFromNow(11),
                returnDate: undefined
            },
            {
                isbn: "9786165789421",
                dueDate: daysFromNow(11),
                returnDate: undefined
            }
        ]
    },
    {
        memberCode: "631001005",
        borrowDate: daysAgo(2),
        borrowingDetails: [
            {
                isbn: "9786167825403", // This book is borrowed again after being returned
                dueDate: daysFromNow(12),
                returnDate: undefined
            }
        ]
    }
];