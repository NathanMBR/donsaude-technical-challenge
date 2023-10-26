import { type RepositoryPartner } from '../../../models'

export namespace CreatePartnerRepository {
  export type Request = {
    name: string
    email: string
    password: string
    category: string
    cnpj: string
    phone: string
    cellphone: string
    clinicalManagerName: string
    financialManagerName: string
    addressId: number
  }

  export type Response = Promise<RepositoryPartner>
}

export interface CreatePartnerRepository {
  create(request: CreatePartnerRepository.Request): CreatePartnerRepository.Response
}
