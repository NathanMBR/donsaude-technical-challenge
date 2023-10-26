export namespace DeletePartnerRepository {
  export type Request = {
    id: number
  }

  export type Response = Promise<void>
}

export interface DeletePartnerRepository {
  delete(request: DeletePartnerRepository.Request): DeletePartnerRepository.Response
}
