import { type FindOneAddress } from '../../../domain'
import { type FindOneAddressRepository, type IdValidator } from '../../protocols'

export class FindOneAddressImpl implements FindOneAddress {
  constructor (
    private readonly idValidator: IdValidator,
    private readonly findOneAddressRepository: FindOneAddressRepository
  ) {}

  async execute (request: FindOneAddress.Request): FindOneAddress.Response {
    const { id } = request

    const idValidationResponse = this.idValidator.validate(id)
    if (!idValidationResponse.success)
      return {
        type: 'INVALID_REQUEST',
        message: idValidationResponse.errorMessage
      }

    const address = await this.findOneAddressRepository.findOne({ id })
    if (!address || address.deletedAt)
      return {
        type: 'NOT_FOUND'
      }

    return {
      type: 'SUCCESS',
      data: address
    }
  }
}
