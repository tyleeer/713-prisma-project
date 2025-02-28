import { BookQueriesParamsExpress } from '../models/types';
import * as repo from '../repositories/bookRepositories'

export const getAllBooks = () => {
    return repo.getAllBooks();
}

export const getFilteredBooks = (params: BookQueriesParamsExpress) => {
    const title = typeof params.title === 'string' ? params.title : null;
    const dueDateStart = params.dueDate ? new Date(params.dueDate as string) : null;
    const dueDateEnd = dueDateStart ? new Date(dueDateStart) : null;
    dueDateEnd?.setUTCHours(23, 59, 59);

    return repo.getFilteredBooks({ title, dueDateStart, dueDateEnd });
}