import { type Address } from '../../models'

export namespace FindOneAddress {
  export type Request = {
    id: number
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

export interface FindOneAddress {
  execute(request: FindOneAddress.Request): FindOneAddress.Response
}
