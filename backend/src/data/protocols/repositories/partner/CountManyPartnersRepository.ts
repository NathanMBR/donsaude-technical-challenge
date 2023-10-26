export namespace CountManyPartnersRepository {
  export type Request = {
    search?: string
  }

  export type Response = Promise<number>
}

export interface CountManyPartnersRepository {
  countMany(request: CountManyPartnersRepository.Request): CountManyPartnersRepository.Response
}
