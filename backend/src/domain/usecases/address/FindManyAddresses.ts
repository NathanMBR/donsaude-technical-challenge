import {
  type Pagination,
  type Address
} from '../../models'

export namespace FindManyAddresses {
  export type Request = {
    page: number
    quantity: number
    search?: string
  }

  export type Response = Promise<Pagination<Address>>
}

export interface FindManyAddresses {
  execute(request: FindManyAddresses.Request): FindManyAddresses.Response
}
