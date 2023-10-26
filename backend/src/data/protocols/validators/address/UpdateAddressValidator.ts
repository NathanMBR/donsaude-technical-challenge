export namespace UpdateAddressValidator {
  export type Request = unknown

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

export interface UpdateAddressValidator {
  validate(request: UpdateAddressValidator.Request): UpdateAddressValidator.Response
}
