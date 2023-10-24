import { type Address } from '../../models'

export namespace CreateAddress {
  export type Request = {
    postalCode: string
    street: string
    number: string
    neighborhood: string
    complement: string | null
    city: string
    state: string
  }

  export type Response = Promise<Address>
}

export interface CreateAddress {
  execute(request: CreateAddress.Request): CreateAddress.Response
}
