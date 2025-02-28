import { BookQueriesParamsExpress } from '../models/types';
import * as repo from '../repositories/bookRepositories'

export const getAllBooks = () => {
    return repo.getAllBooks();
}

export const getFilteredBooks = (params: BookQueriesParamsExpress) => {
    const title = typeof params.title === 'string' ? params.title : null;
    const dueDate = params.dueDate ? new Date(params.dueDate as string) : null;
    const isReturned = params.isReturned ? `${params.isReturned}`.toLowerCase() === 'true' : null;

    return repo.getFilteredBooks({ title, dueDate, isReturned });
}