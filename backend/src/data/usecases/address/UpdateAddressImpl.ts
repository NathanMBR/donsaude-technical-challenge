import { type UpdateAddress } from '../../../domain'
import {
  type IdValidator,
  type UpdateAddressValidator,
  type FindOneAddressRepository,
  type UpdateAddressRepository
} from '../../protocols'

export class UpdateAddressImpl implements UpdateAddress {
  constructor (
    private readonly idValidator: IdValidator,
    private readonly updateAddressValidator: UpdateAddressValidator,
    private readonly findOneAddressRepository: FindOneAddressRepository,
    private readonly updateAddressRepository: UpdateAddressRepository
  ) {}

  async execute (request: UpdateAddress.Request): UpdateAddress.Response {
    const { id, ...updateRequest } = request

    const idValidationResult = this.idValidator.validate(id)
    if (!idValidationResult.success)
      return {
        type: 'INVALID_REQUEST',
        message: idValidationResult.errorMessage
      }

    const updateRequestValidationResult = this.updateAddressValidator.validate(updateRequest)
    if (!updateRequestValidationResult.success)
      return {
        type: 'INVALID_REQUEST',
        message: updateRequestValidationResult.errorMessage
      }

    const doesAddressExist = await this.findOneAddressRepository.findOne({ id: idValidationResult.data })
    if (!doesAddressExist)
      return {
        type: 'NOT_FOUND'
      }

    const address = await this.updateAddressRepository.create({
      id: idValidationResult.data,
      ...updateRequestValidationResult.data
    })

    return {
      type: 'SUCCESS',
      data: address
    }
  }
}
