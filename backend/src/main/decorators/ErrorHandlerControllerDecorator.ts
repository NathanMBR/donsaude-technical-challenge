import { HttpResponseHelper, type Controller } from '../../presentation'

export class ErrorHandlerControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller
  ) {}

  async handle (request: Controller.Request): Controller.Response {
    try {
      const httpResponse = await this.controller.handle(request)
      return httpResponse
    } catch (error) {
      return HttpResponseHelper.internalServerError()
    }
  }
}
