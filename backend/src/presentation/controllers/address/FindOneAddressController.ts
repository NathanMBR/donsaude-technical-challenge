import { type Controller } from '../../protocols'
import { type FindOneAddress } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class FindOneAddressController implements Controller {
  constructor (
    private readonly findOneAddress: FindOneAddress
  ) {}

  async handle (request: Controller.Request): Controller.Response {
    const { id } = request.params

    const findOneAddressResponse = await this.findOneAddress.execute(id)

    if (findOneAddressResponse.type === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest(findOneAddressResponse.message)

    if (findOneAddressResponse.type === 'NOT_FOUND')
      return HttpResponseHelper.notFound('Address not found')

    return HttpResponseHelper.ok(findOneAddressResponse.data)
  }
}
