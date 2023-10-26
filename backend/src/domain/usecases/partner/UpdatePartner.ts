import { type Partner } from '../../models'

export namespace UpdatePartner {
  export type Request = {
    id: number
    name: string
    category: string
    cnpj: string
    phone: string
    cellphone: string
    clinicalManagerName: string
    financialManagerName: string
    addressId: number
  }

  type SuccessResponse = {
    type: 'SUCCESS'
    data: Partner
  }

  type InvalidRequestResponse = {
    type: 'INVALID_REQUEST'
    message?: string
  }

  type AddressNotFoundResponse = {
    type: 'ADDRESS_NOT_FOUND'
  }

  type PartnerNotFoundResponse = {
    type: 'PARTNER_NOT_FOUND'
  }

  export type Response = Promise<SuccessResponse | InvalidRequestResponse | AddressNotFoundResponse | PartnerNotFoundResponse>
}

export interface UpdatePartner {
  execute(request: UpdatePartner.Request): UpdatePartner.Response
}
