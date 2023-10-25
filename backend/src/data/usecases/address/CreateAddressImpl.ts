import { type CreateAddress } from '../../../domain'
import {
  type CreateAddressValidator,
  type CreateAddressRepository
} from '../../protocols'

export class CreateAddressImpl implements CreateAddress {
  constructor (
    private readonly createAddressValidator: CreateAddressValidator,
    private readonly createAddressRepository: CreateAddressRepository
  ) {}

  async execute (request: CreateAddress.Request): CreateAddress.Response {
    const validationResult = this.createAddressValidator.validate(request)
    if (!validationResult.success)
      return {
        type: 'INVALID_REQUEST',
        message: validationResult.errorMessage
      }

    const address = await this.createAddressRepository.create(validationResult.data)

    return {
      type: 'SUCCESS',
      data: address
    }
  }
}
