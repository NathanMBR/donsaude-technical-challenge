import { type FindOnePartner } from '../../../domain'
import {
  type IdValidator,
  type FindOnePartnerRepository
} from '../../protocols'

export class FindOnePartnerImpl implements FindOnePartner {
  constructor (
    private readonly idValidator: IdValidator,
    private readonly findOnePartnerRepository: FindOnePartnerRepository
  ) {}

  async execute (request: FindOnePartner.Request): FindOnePartner.Response {
    const { id } = request

    const idValidationResponse = this.idValidator.validate(id)
    if (!idValidationResponse.success)
      return {
        type: 'INVALID_REQUEST',
        message: idValidationResponse.errorMessage
      }

    const parsedId = idValidationResponse.data
    const partner = await this.findOnePartnerRepository.findOne({ id: parsedId })
    if (!partner || partner.deletedAt)
      return {
        type: 'NOT_FOUND'
      }

    return {
      type: 'SUCCESS',
      data: partner
    }
  }
}
