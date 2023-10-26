export namespace UpdatePartnerValidator {
  export type Request = unknown

  type SuccessResponse = {
    success: true
    data: {
      name: string
      category: string
      cnpj: string
      phone: string
      cellphone: string
      clinicalManagerName: string
      financialManagerName: string
      addressId: number
    }
  }

  type FailResponse = {
    success: false
    errorMessage?: string
  }

  export type Response = SuccessResponse | FailResponse
}

export interface UpdatePartnerValidator {
  validate(request: UpdatePartnerValidator.Request): UpdatePartnerValidator.Response
}
