export namespace CreateAddressValidator {
  export type Request = any

  type SuccessResponse = {
    success: true
    data: {
      postalCode: string
      street: string
      number: string
      neighborhood: string
      complement: string | null
      city: string
      state: string
    }
  }

  type FailResponse = {
    success: false
    errorMessage?: string
  }

  export type Response = SuccessResponse | FailResponse
}

export interface CreateAddressValidator {
  validate(request: CreateAddressValidator.Request): CreateAddressValidator.Response
}
