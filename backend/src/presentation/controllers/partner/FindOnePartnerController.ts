import { type Controller } from '../../protocols'
import { type FindOnePartner } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class FindOnePartnerController implements Controller {
  constructor (private readonly findOnePartner: FindOnePartner) {}

  async handle (request: Controller.Request): Controller.Response {
    const { id } = request.params

    const findOnePartnerResponse = await this.findOnePartner.execute({ id })
    if (findOnePartnerResponse.type === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest(findOnePartnerResponse.message)

    if (findOnePartnerResponse.type === 'NOT_FOUND')
      return HttpResponseHelper.notFound('Partner not found')

    return HttpResponseHelper.ok(findOnePartnerResponse.data)
  }
}
