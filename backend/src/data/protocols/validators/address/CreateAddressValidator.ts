import { type Address } from '../../../../domain'

export namespace CreateAddressValidator {
  export type Request = any

  type SuccessResponse = {
    success: true
    data: Address
  }

  type FailResponse = {
    success: false
    error: string
  }

  export type Response = SuccessResponse | FailResponse
}

export interface CreateAddressValidator {
  validate(request: CreateAddressValidator.Request): CreateAddressValidator.Response
}
