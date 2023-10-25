export namespace CountManyAddressesRepository {
  export type Request = {
    search?: string
  }

  export type Response = Promise<number>
}

export interface CountManyAddressesRepository {
  countMany(request: CountManyAddressesRepository.Request): CountManyAddressesRepository.Response
}
