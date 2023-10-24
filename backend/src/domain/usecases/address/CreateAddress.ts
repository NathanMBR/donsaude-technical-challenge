import { type Address } from '../../models'

export namespace CreateAddress {
  export type Request = {
    postalCode: string
    street: string
    number: string
    neighborhood: string
    complement: string | null
    city: string
    state: string
  }

  type SuccessResponse = {
    success: true
    data: Address
  }

  type CreateAddressErrors = 'INVALID_REQUEST'

  type FailResponse = {
    success: false
    error: CreateAddressErrors
  }

  export type Response = Promise<SuccessResponse | FailResponse>
}

export interface CreateAddress {
  execute(request: CreateAddress.Request): CreateAddress.Response
}
