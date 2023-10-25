import { type RepositoryPagination } from '../../models'

export namespace PaginationValidator {
  export type Request = unknown

  export type Response = RepositoryPagination
}

export interface PaginationValidator {
  validate(request: PaginationValidator.Request): PaginationValidator.Response
}
