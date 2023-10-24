export type RepositoryAddress = {
  id: number
  postalCode: string
  street: string
  number: string
  neighborhood: string
  complement: string | null
  city: string
  state: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
