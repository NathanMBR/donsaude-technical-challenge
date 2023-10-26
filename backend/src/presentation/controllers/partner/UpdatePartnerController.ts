import { type Controller } from '../../protocols'
import { type UpdatePartner } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class UpdatePartnerController implements Controller {
  constructor (private readonly updatePartner: UpdatePartner) {}

  async handle (request: Controller.Request): Controller.Response {
    const { body, params: { id } } = request

    const updatePartnerResponse = await this.updatePartner.execute({
      ...body,
      id
    })

    if (updatePartnerResponse.type === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest(updatePartnerResponse.message)

    if (updatePartnerResponse.type === 'PARTNER_NOT_FOUND')
      return HttpResponseHelper.notFound('Partner not found')

    if (updatePartnerResponse.type === 'ADDRESS_NOT_FOUND')
      return HttpResponseHelper.notFound('Address not found')

    return HttpResponseHelper.ok(updatePartnerResponse.data)
  }
}
