import { type Controller } from '../../protocols'
import { type UpdatePartner } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class CreatePartnerController implements Controller {
  constructor (private readonly createPartner: UpdatePartner) {}

  async handle (request: Controller.Request): Controller.Response {
    const { body } = request

    const createPartnerResponse = await this.createPartner.execute(body)
    if (createPartnerResponse.type === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest(createPartnerResponse.message)

    if (createPartnerResponse.type === 'EMAIL_ALREADY_EXISTS')
      return HttpResponseHelper.badRequest('Email already exists')

    if (createPartnerResponse.type === 'ADDRESS_NOT_FOUND')
      return HttpResponseHelper.notFound('Address not found')

    return HttpResponseHelper.created(createPartnerResponse.data)
  }
}
