import { type Address } from '../../models'

export namespace FindOneAddress {
  export type Request = {
    id: number
  }

  export type Response = Promise<Address | null>
}

export interface FindOneAddress {
  execute(request: FindOneAddress.Request): FindOneAddress.Response
}
