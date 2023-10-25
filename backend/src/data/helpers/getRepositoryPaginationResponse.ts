import { type Pagination } from '../../domain'

export type GetRepositoryPaginationResponseParam<T> = {
  take: number
  skip: number
  count: number
  data: Array<T>
}

export const getRepositoryPaginationResponse = <T>(request: GetRepositoryPaginationResponseParam<T>): Pagination<T> => {
  const {
    take,
    skip,
    count,
    data
  } = request

  const currentPage = skip / take + 1
  const lastPage = Math.ceil(count / take)

  return {
    quantityPerPage: take,
    total: count,
    currentPage,
    lastPage,
    data
  }
}
