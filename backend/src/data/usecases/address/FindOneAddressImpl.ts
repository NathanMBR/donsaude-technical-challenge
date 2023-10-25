import { type FindOneAddress } from '../../../domain'
import { type FindOneAddressRepository, type IdValidator } from '../../protocols'

export class FindOneAddressImpl implements FindOneAddress {
  constructor (
    private readonly idValidator: IdValidator,
    private readonly findOneAddressRepository: FindOneAddressRepository
  ) {}

  async execute (request: FindOneAddress.Request): FindOneAddress.Response {
    const { id } = request

    const isIdValid = this.idValidator.validate(id)
    if (!isIdValid)
      return {
        type: 'INVALID_REQUEST',
        message: 'Invalid ID'
      }

    const address = await this.findOneAddressRepository.findOne({ id })
    if (!address)
      return {
        type: 'NOT_FOUND'
      }

    return {
      type: 'SUCCESS',
      data: address
    }
  }
}
