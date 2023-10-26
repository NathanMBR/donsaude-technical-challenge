import { type DeletePartner } from '../../../domain'
import {
  type IdValidator,
  type FindOnePartnerRepository,
  type DeletePartnerRepository
} from '../../protocols'

export class DeletePartnerImpl implements DeletePartner {
  constructor (
    private readonly idValidator: IdValidator,
    private readonly findOnePartnerRepository: FindOnePartnerRepository,
    private readonly deletePartnerRepository: DeletePartnerRepository
  ) {}

  async execute (request: DeletePartner.Request): DeletePartner.Response {
    const { id } = request

    const idValidationResponse = this.idValidator.validate(id)
    if (!idValidationResponse.success)
      return 'INVALID_REQUEST'

    const parsedId = idValidationResponse.data
    const partner = await this.findOnePartnerRepository.findOne({ id: parsedId })
    if (!partner || partner.deletedAt)
      return 'NOT_FOUND'

    await this.deletePartnerRepository.delete({ id: parsedId })

    return 'SUCCESS'
  }
}
