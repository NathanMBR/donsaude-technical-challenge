import { type RepositoryPartner } from '../../../models'

export namespace UpdatePartnerRepository {
  export type Request = {
    name: string
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

export interface UpdatePartnerRepository {
  update(request: UpdatePartnerRepository.Request): UpdatePartnerRepository.Response
}
