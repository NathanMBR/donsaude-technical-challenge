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

  type FailResponseErrorTypes =
    'INVALID_PROPERTY_TYPE' |
    'INVALID_POSTAL_CODE_FORMAT'

  type FailResponse = {
    success: false
    error: {
      type: FailResponseErrorTypes
      message?: string
    }
  }

  export type Response = SuccessResponse | FailResponse
}

export interface CreateAddressValidator {
  validate(request: CreateAddressValidator.Request): CreateAddressValidator.Response
}
