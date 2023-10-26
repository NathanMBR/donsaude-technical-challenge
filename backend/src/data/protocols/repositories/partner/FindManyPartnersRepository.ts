import { type RepositoryPartner } from '../../../models'

export namespace FindManyPartnersRepository {
  export type Request = {
    take: number
    skip: number
    search?: string
  }

  export type Response = Promise<Array<RepositoryPartner>>
}

export interface FindManyPartnersRepository {
  findMany(request: FindManyPartnersRepository.Request): FindManyPartnersRepository.Response
}
