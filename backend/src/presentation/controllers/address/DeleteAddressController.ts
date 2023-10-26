import { type Controller } from '../../protocols'
import { type DeleteAddress } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class DeleteAddressController implements Controller {
  constructor (
    private readonly deleteAddress: DeleteAddress
  ) {}

  async handle (request: Controller.Request): Controller.Response {
    const { id } = request.params

    const deleteAddressResponse = await this.deleteAddress.execute({ id })

    if (deleteAddressResponse === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest('Invalid ID')

    if (deleteAddressResponse === 'NOT_FOUND')
      return HttpResponseHelper.notFound('Address not found')

    return HttpResponseHelper.noContent()
  }
}
