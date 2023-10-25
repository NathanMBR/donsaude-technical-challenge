export namespace IdValidator {
  export type Request = any

  export type Response = boolean
}

export interface IdValidator {
  validate(request: IdValidator.Request): IdValidator.Response
}
