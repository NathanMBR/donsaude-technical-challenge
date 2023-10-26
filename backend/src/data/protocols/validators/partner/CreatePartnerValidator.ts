export namespace CreatePartnerValidator {
  export type Request = unknown

  type SuccessResponse = {
    success: true
    data: {
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
  }

  type FailResponse = {
    success: false
    errorMessage?: string
  }

  export type Response = SuccessResponse | FailResponse
}

export interface CreatePartnerValidator {
  validate(request: CreatePartnerValidator.Request): CreatePartnerValidator.Response
}
