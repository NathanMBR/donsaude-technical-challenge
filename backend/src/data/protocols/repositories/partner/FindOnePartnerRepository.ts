import { type RepositoryPartner } from '../../../models'

export namespace FindOnePartnerRepository {
  export type Request = {
    id: number
  }

  export type Response = Promise<RepositoryPartner | null>
}

export interface FindOnePartnerRepository {
  findOne(request: FindOnePartnerRepository.Request): FindOnePartnerRepository.Response
}
