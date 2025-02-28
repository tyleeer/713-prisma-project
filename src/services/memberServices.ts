import * as repo from '../repositories/memberRepositories'

export const getAllMembers = () => {
    return repo.getAllMembers(null);
}

export const getSortedMembers = (sort: string) => {
    return repo.getAllMembers(sort);
}