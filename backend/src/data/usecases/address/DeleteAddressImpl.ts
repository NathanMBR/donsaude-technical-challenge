import { type DeleteAddress } from '../../../domain'
import {
  type IdValidator,
  type FindOneAddressRepository,
  type DeleteAddressRepository
} from '../../protocols'

export class DeleteAddressImpl implements DeleteAddress {
  constructor (
    private readonly idValidator: IdValidator,
    private readonly findOneAddressRepository: FindOneAddressRepository,
    private readonly deleteAddressRepository: DeleteAddressRepository
  ) {}

  async execute (request: DeleteAddress.Request): DeleteAddress.Response {
    const { id } = request

    const idValidationResponse = this.idValidator.validate(id)
    if (!idValidationResponse.success)
      return 'INVALID_REQUEST'

    const parsedId = idValidationResponse.data
    const address = await this.findOneAddressRepository.findOne({ id: parsedId })
    if (!address || address.deletedAt)
      return 'NOT_FOUND'

    await this.deleteAddressRepository.delete({ id: parsedId })

    return 'SUCCESS'
  }
}
