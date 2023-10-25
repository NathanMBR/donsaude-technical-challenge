import { type Controller } from '../../protocols'
import { type FindManyAddresses } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class FindManyAddressesController implements Controller {
  constructor (
    private readonly findManyAddresses: FindManyAddresses
  ) {}

  async handle (request: Controller.Request): Controller.Response {
    const {
      page,
      quantity,
      search
    } = request.query

    const findManyAddressesResponse = await this.findManyAddresses.execute({
      page,
      quantity,
      search
    })

    return HttpResponseHelper.ok(findManyAddressesResponse)
  }
}
