export namespace DeleteAddress {
  export type Request = {
    id: number
  }

  export type Response = Promise<void>
}

export interface DeleteAddress {
  execute(request: DeleteAddress.Request): DeleteAddress.Response
}
