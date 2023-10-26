import { prisma } from '../../config'
import {
  ZodIdValidator,
  PrismaPartnerRepository
} from '../../../infra'
import { FindOnePartnerImpl } from '../../../data'
import { FindOnePartnerController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeFindOnePartnerController = () => {
  const idValidator = new ZodIdValidator()

  const findOnePartnerRepository = new PrismaPartnerRepository(prisma)

  const findOnePartner = new FindOnePartnerImpl(
    idValidator,
    findOnePartnerRepository
  )

  const findOnePartnerController = new ErrorHandlerControllerDecorator(
    new FindOnePartnerController(findOnePartner)
  )

  return findOnePartnerController
}
