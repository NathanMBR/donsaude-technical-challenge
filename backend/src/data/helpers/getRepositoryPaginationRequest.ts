export type GetRepositoryPaginationRequestParam = {
  quantity: number
  page: number
}

export type GetRepositoryPaginationRequestReturn = {
  take: number
  skip: number
}

export const getRepositoryPaginationRequest = (request: GetRepositoryPaginationRequestParam): GetRepositoryPaginationRequestReturn => {
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
