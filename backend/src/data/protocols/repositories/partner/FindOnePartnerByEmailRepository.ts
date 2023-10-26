import { type RepositoryPartner } from '../../../models'

export namespace FindOnePartnerByEmailRepository {
  export type Request = {
    email: string
  }

  export type Response = Promise<RepositoryPartner | null>
}

export interface FindOnePartnerByEmailRepository {
  findOneByEmail(request: FindOnePartnerByEmailRepository.Request): FindOnePartnerByEmailRepository.Response
}
