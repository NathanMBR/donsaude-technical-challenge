export type CreatePartner = {
  name: string
  email: string
  category: string
  cnpj: string
  phone: string
  cellphone: string
  clinicalManagerName: string
  financialManagerName: string
  addressId: number
}

export type CreatePartnerPartial = Omit<CreatePartner, "addressId">

export type Partner = {
  id: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
} & CreatePartner
