import { type Controller } from '../../protocols'
import { type DeletePartner } from '../../../domain'
import { HttpResponseHelper } from '../../helpers'

export class DeletePartnerController implements Controller {
  constructor (
    private readonly deletePartner: DeletePartner
  ) {}

  async handle (request: Controller.Request): Controller.Response {
    const { id } = request.params

    const deletePartnerResponse = await this.deletePartner.execute({ id })

    if (deletePartnerResponse === 'INVALID_REQUEST')
      return HttpResponseHelper.badRequest('Invalid ID')

    if (deletePartnerResponse === 'NOT_FOUND')
      return HttpResponseHelper.notFound('Partner not found')

    return HttpResponseHelper.noContent()
  }
}
