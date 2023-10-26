export namespace DeletePartner {
  export type Request = {
    id: number
  }

  export type PossibleResponses = 'SUCCESS' | 'INVALID_REQUEST' | 'NOT_FOUND'

  export type Response = Promise<PossibleResponses>
}

export interface DeletePartner {
  execute(request: DeletePartner.Request): DeletePartner.Response
}
