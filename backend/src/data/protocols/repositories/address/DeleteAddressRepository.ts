export namespace DeleteAddressRepository {
  export type Request = {
    id: number
  }

  export type Response = Promise<void>
}

export interface DeleteAddressRepository {
  delete(request: DeleteAddressRepository.Request): DeleteAddressRepository.Response
}
