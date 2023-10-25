import { type RepositoryAddress } from '../../../models'

export namespace FindManyAddressesRepository {
  export type Request = {
    take: number
    skip: number
    search?: string
  }

  export type Response = Promise<Array<RepositoryAddress>>
}

export interface FindManyAddressesRepository {
  findMany(request: FindManyAddressesRepository.Request): FindManyAddressesRepository.Response
}
