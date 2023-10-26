import { type Controller } from '../../protocols'
import { type CreatePartner } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class CreatePartnerController implements Controller {
  constructor (private readonly createPartner: CreatePartner) {}

  async handle (request: Controller.Request): Controller.Response {
    const { body } = request

    const createPartnerResponse = await this.createPartner.execute(body)
    if (createPartnerResponse.type === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest(createPartnerResponse.message)

    if (createPartnerResponse.type === 'ADDRESS_NOT_FOUND')
      return HttpResponseHelper.notFound('Address not found')

    return HttpResponseHelper.created(createPartnerResponse.data)
  }
}
