export namespace IdValidator {
  export type Request = any

  type SuccessResponse = {
    success: true
    data: number
  }

  type FailResponse = {
    success: false
    errorMessage?: string
  }

  export type Response = SuccessResponse | FailResponse
}

export interface IdValidator {
  validate(request: IdValidator.Request): IdValidator.Response
}
