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
    type: 'SUCCESS'
    data: Address
  }

  type InvalidRequestResponse = {
    type: 'INVALID_REQUEST'
    message?: string
  }

  export type Response = Promise<SuccessResponse | InvalidRequestResponse>
}

export interface CreateAddress {
  execute(request: CreateAddress.Request): CreateAddress.Response
}
