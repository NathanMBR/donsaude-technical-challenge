import { type RepositoryAddress } from '../../../models'

export namespace CreateAddressRepository {
  export type Request = {
    postalCode: string
    street: string
    number: string
    neighborhood: string
    complement: string | null
    city: string
    state: string
  }

  export type Response = Promise<RepositoryAddress>
}

export interface CreateAddressRepository {
  create(request: CreateAddressRepository.Request): CreateAddressRepository.Response
}
