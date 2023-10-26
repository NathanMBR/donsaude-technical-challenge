import {
  type Pagination,
  type Partner
} from '../../models'

export namespace FindManyPartners {
  export type Request = {
    page: number
    quantity: number
    search?: string
  }

  export type Response = Promise<Pagination<Partner>>
}

export interface FindManyPartners {
  execute(request: FindManyPartners.Request): FindManyPartners.Response
}
