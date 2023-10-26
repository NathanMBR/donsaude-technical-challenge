import { type UpdateAddress } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'
import { type Controller } from '../../protocols'

export class UpdateAddressController implements Controller {
  constructor (private readonly updateAddress: UpdateAddress) {}

  async handle (request: Controller.Request): Controller.Response {
    const { body, params: { id } } = request

    const updateAddressResponse = await this.updateAddress.execute({
      id,
      ...body
    })
    if (updateAddressResponse.type === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest(updateAddressResponse.message)

    if (updateAddressResponse.type === 'NOT_FOUND')
      return HttpResponseHelper.notFound('Address not found')

    return HttpResponseHelper.ok(updateAddressResponse.data)
  }
}
