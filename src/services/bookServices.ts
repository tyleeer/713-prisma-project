import { BookQueriesParamsExpress } from '../models/types';
import * as repo from '../repositories/bookRepositories'

export const getAllBooks = async (params: BookQueriesParamsExpress) => {
    const { pageNo, pageSize } = params;

    if (pageNo < 1 || pageSize < 1) {
        throw new Error("Invalid pageNo or pageSize");
    }

    const { totalBooks, books } = await repo.getAllBooks({ pageNo, pageSize });

    if (totalBooks == 0) {
        throw new Error("No event found.");
    }

    const totalPages = Math.ceil(totalBooks / pageSize);
    const response = {
        data: books,
        pagination: {
            total_records: totalBooks,
            totle_pages: totalPages,
            current_records: books.length,
            current_page: pageNo
        }
    }
    return response
}


export const getFilteredBooks = async (params: BookQueriesParamsExpress) => {
    const { pageNo, pageSize } = params;

    if (pageNo < 1 || pageSize < 1) {
        throw new Error("Invalid pageNo or pageSize");
    }

    const title = typeof params.title === 'string' ? params.title : undefined;
    const dueDateStart = params.dueDate ? new Date(params.dueDate as string) : undefined;
    const dueDateEnd = dueDateStart ? new Date(dueDateStart) : undefined;
    dueDateEnd?.setUTCHours(23, 59, 59);
    const keyword = typeof params.keyword === 'string' ? params.keyword : undefined;

    const { totalBooks, books } = await repo.getFilteredBooks({ title, dueDateStart, dueDateEnd, pageNo, pageSize, keyword });

    if (totalBooks == 0) {
        throw new Error("No event found.");
    }

    const totalPages = Math.ceil(totalBooks / pageSize);
    const response = {
        data: books,
        pagination: {
            total_records: totalBooks,
            totle_pages: totalPages,
            current_records: books.length,
            current_page: pageNo
        }
    }
    return response
}