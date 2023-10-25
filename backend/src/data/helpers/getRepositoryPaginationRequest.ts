import { type RepositoryPagination } from '../models/RepositoryPagination'

export type GetRepositoryPaginationRequestParam = {
  quantity: number
  page: number
}

export const getRepositoryPaginationRequest = (request: GetRepositoryPaginationRequestParam): Omit<RepositoryPagination, 'string'> => {
  const {
    quantity,
    page
  } = request

  const take = quantity
  const skip = (page - 1) * take

  return {
    take,
    skip
  }
}
