export namespace PaginationValidator {
  export type Request = unknown

  export type Response = {
    quantity: number
    page: number
    search?: string
  }
}

export interface PaginationValidator {
  validate(request: PaginationValidator.Request): PaginationValidator.Response
}
