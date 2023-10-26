import { type RepositoryAddress } from '../../../models'

export namespace UpdateAddressRepository {
  export type Request = {
    id: number
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

export interface UpdateAddressRepository {
  create(request: UpdateAddressRepository.Request): UpdateAddressRepository.Response
}
