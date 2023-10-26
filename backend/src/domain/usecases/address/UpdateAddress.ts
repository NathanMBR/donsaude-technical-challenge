import { type Address } from '../../models'

export namespace UpdateAddress {
  export type Request = {
    id: number
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

  type NotFoundResponse = {
    type: 'NOT_FOUND'
  }

  export type Response = Promise<SuccessResponse | InvalidRequestResponse | NotFoundResponse>
}

export interface UpdateAddress {
  execute(request: UpdateAddress.Request): UpdateAddress.Response
}
