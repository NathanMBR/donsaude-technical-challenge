import { type Controller } from '../../protocols'
import { type FindManyPartners } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class FindManyPartnersController implements Controller {
  constructor (
    private readonly findManyPartners: FindManyPartners
  ) {}

  async handle (request: Controller.Request): Controller.Response {
    const {
      page,
      quantity,
      search
    } = request.query

    const findManyPartnersResponse = await this.findManyPartners.execute({
      page,
      quantity,
      search
    })

    return HttpResponseHelper.ok(findManyPartnersResponse)
  }
}
