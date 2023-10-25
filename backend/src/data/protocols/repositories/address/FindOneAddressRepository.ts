import { type RepositoryAddress } from '../../../models'

export namespace FindOneAddressRepository {
  export type Request = {
    id: number
  }

  export type Response = Promise<RepositoryAddress | null>
}

export interface FindOneAddressRepository {
  findOne(request: FindOneAddressRepository.Request): FindOneAddressRepository.Response
}
