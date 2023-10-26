import {
  ZodCreatePartnerValidator,
  PrismaAddressRepository,
  BcryptjsHashService,
  PrismaPartnerRepository
} from '../../../infra'
import { prisma } from '../../config'
import { CreatePartnerImpl } from '../../../data'
import { CreatePartnerController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeCreatePartnerController = () => {
  const createPartnerValidator = new ZodCreatePartnerValidator()

  const findOneAddressRepository = new PrismaAddressRepository(prisma)
  const createPartnerRepository = new PrismaPartnerRepository(prisma)

  const hashService = new BcryptjsHashService()

  const createPartner = new CreatePartnerImpl(
    createPartnerValidator,
    findOneAddressRepository,
    hashService,
    createPartnerRepository
  )

  const createPartnerController = new ErrorHandlerControllerDecorator(
    new CreatePartnerController(createPartner)
  )

  return createPartnerController
}
