export type Partner = {
  id: number
  name: string
  email: string
  category: string
  cnpj: string
  phone: string
  cellphone: string
  clinicalManagerName: string
  financialManagerName: string
  addressId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
