import { type Partner } from '../../models'

export namespace FindOnePartner {
  export type Request = {
    id: number
  }

  type SuccessResponse = {
    type: 'SUCCESS'
    data: Partner
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

export interface FindOnePartner {
  execute(request: FindOnePartner.Request): FindOnePartner.Response
}
