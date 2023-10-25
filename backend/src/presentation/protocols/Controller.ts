import {
  type HttpRequest,
  type HttpResponse
} from '../models'

export namespace Controller {
  export type Request = HttpRequest

  export type Response = Promise<HttpResponse>
}

export interface Controller {
  handle(request: Controller.Request): Controller.Response
}
