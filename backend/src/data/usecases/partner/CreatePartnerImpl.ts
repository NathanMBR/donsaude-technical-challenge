import { type CreatePartner } from '../../../domain'
import {
  type CreatePartnerValidator,
  type FindOnePartnerByEmailRepository,
  type FindOneAddressRepository,
  type HashService,
  type CreatePartnerRepository
} from '../../protocols'

export class CreatePartnerImpl implements CreatePartner {
  constructor (
    private readonly createPartnerValidator: CreatePartnerValidator,
    private readonly findOnePartnerByEmailRepository: FindOnePartnerByEmailRepository,
    private readonly findOneAddressRepository: FindOneAddressRepository,
    private readonly hashService: HashService,
    private readonly createPartnerRepository: CreatePartnerRepository
  ) {}

  async execute (request: CreatePartner.Request): CreatePartner.Response {
    const validationResult = this.createPartnerValidator.validate(request)
    if (!validationResult.success)
      return {
        type: 'INVALID_REQUEST',
        message: validationResult.errorMessage
      }

    const partnerWithRequestedEmail = await this.findOnePartnerByEmailRepository.findOneByEmail({ email: validationResult.data.email })
    if (partnerWithRequestedEmail)
      return {
        type: 'EMAIL_ALREADY_EXISTS'
      }

    const address = await this.findOneAddressRepository.findOne({ id: validationResult.data.addressId })
    if (!address || address.deletedAt)
      return {
        type: 'ADDRESS_NOT_FOUND'
      }

    const hashedPassword = await this.hashService.hash({ text: validationResult.data.password })
    const { password, ...partnerWithoutPassword } = await this.createPartnerRepository.create({
      ...validationResult.data,
      password: hashedPassword
    })

    return {
      type: 'SUCCESS',
      data: partnerWithoutPassword
    }
  }
}
