import { type Partner } from '../../models'

export namespace UpdatePartner {
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

  type SuccessResponse = {
    type: 'SUCCESS'
    data: Partner
  }

  type InvalidRequestResponse = {
    type: 'INVALID_REQUEST'
    message?: string
  }

  type EmailAlreadyExistsResponse = {
    type: 'EMAIL_ALREADY_EXISTS'
  }

  type AddressNotFoundResponse = {
    type: 'ADDRESS_NOT_FOUND'
  }

  export type Response = Promise<SuccessResponse | InvalidRequestResponse | EmailAlreadyExistsResponse | AddressNotFoundResponse>
}

export interface UpdatePartner {
  execute(request: UpdatePartner.Request): UpdatePartner.Response
}
