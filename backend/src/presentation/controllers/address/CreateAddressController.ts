import { type CreateAddress } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'
import { type Controller } from '../../protocols'

export class CreateAddressController implements Controller {
  constructor (private readonly createAddress: CreateAddress) {}

  async handle (request: Controller.Request): Controller.Response {
    const { body } = request

    const createAddressResponse = await this.createAddress.execute(body)
    if (createAddressResponse.type === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest(createAddressResponse.message)

    return HttpResponseHelper.created(createAddressResponse.data)
  }
}
