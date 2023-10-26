import { type UpdatePartner } from '../../../domain'
import {
  type IdValidator,
  type UpdatePartnerValidator,
  type FindOneAddressRepository,
  type FindOnePartnerRepository,
  type UpdatePartnerRepository
} from '../../protocols'

export class UpdatePartnerImpl implements UpdatePartner {
  constructor (
    private readonly idValidator: IdValidator,
    private readonly updatePartnerValidator: UpdatePartnerValidator,
    private readonly findOneAddressRepository: FindOneAddressRepository,
    private readonly findOnePartnerRepository: FindOnePartnerRepository,
    private readonly updatePartnerRepository: UpdatePartnerRepository
  ) {}

  async execute (request: UpdatePartner.Request): UpdatePartner.Response {
    const { id, ...updateRequest } = request

    const idValidationResult = this.idValidator.validate(id)
    if (!idValidationResult.success)
      return {
        type: 'INVALID_REQUEST',
        message: idValidationResult.errorMessage
      }

    const updateRequestValidationResult = this.updatePartnerValidator.validate(updateRequest)
    if (!updateRequestValidationResult.success)
      return {
        type: 'INVALID_REQUEST',
        message: updateRequestValidationResult.errorMessage
      }

    const doesAddressExist = await this.findOneAddressRepository.findOne({ id: updateRequest.addressId })
    if (!doesAddressExist)
      return {
        type: 'ADDRESS_NOT_FOUND'
      }

    const doesPartnerExist = await this.findOnePartnerRepository.findOne({ id: idValidationResult.data })
    if (!doesPartnerExist)
      return {
        type: 'PARTNER_NOT_FOUND'
      }

    const { password, ...partnerWithoutPassword } = await this.updatePartnerRepository.update({
      id: idValidationResult.data,
      ...updateRequestValidationResult.data
    })

    return {
      type: 'SUCCESS',
      data: partnerWithoutPassword
    }
  }
}
