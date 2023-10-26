export namespace HashService {
  export type Request = {
    text: string
  }

  export type Response = Promise<string>
}

export interface HashService {
  hash(request: HashService.Request): HashService.Response
}
