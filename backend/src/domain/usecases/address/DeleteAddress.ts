export namespace DeleteAddress {
  export type Request = {
    id: number
  }

  export type PossibleResponses = 'SUCCESS' | 'INVALID_REQUEST' | 'NOT_FOUND'

  export type Response = Promise<PossibleResponses>
}

export interface DeleteAddress {
  execute(request: DeleteAddress.Request): DeleteAddress.Response
}
