import { type CreatePartner } from '../../../domain'
import {
  type CreatePartnerRepository,
  type FindOneAddressRepository,
  type CreatePartnerValidator
} from '../../protocols'

export class CreatePartnerImpl implements CreatePartner {
  constructor (
    private readonly createPartnerValidator: CreatePartnerValidator,
    private readonly findOneAddressRepository: FindOneAddressRepository,
    private readonly createPartnerRepository: CreatePartnerRepository
  ) {}

  async execute (request: CreatePartner.Request): CreatePartner.Response {
    const validationResult = this.createPartnerValidator.validate(request)
    if (!validationResult.success)
      return {
        type: 'INVALID_REQUEST',
        message: validationResult.errorMessage
      }

    const address = await this.findOneAddressRepository.findOne({ id: request.addressId })
    if (!address || address.deletedAt)
      return {
        type: 'ADDRESS_NOT_FOUND'
      }

    const partner = await this.createPartnerRepository.create(validationResult.data)
    return {
      type: 'SUCCESS',
      data: partner
    }
  }
}
