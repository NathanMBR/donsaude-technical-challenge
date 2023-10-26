import {
  ZodIdValidator,
  PrismaPartnerRepository
} from '../../../infra'
import { prisma } from '../../config'
import { DeletePartnerImpl } from '../../../data'
import { DeletePartnerController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeDeletePartnerController = () => {
  const idValidator = new ZodIdValidator()

  const findAndDeletePartnerRepository = new PrismaPartnerRepository(prisma)

  const deletePartner = new DeletePartnerImpl(
    idValidator,
    findAndDeletePartnerRepository,
    findAndDeletePartnerRepository
  )

  const deletePartnerController = new ErrorHandlerControllerDecorator(
    new DeletePartnerController(deletePartner)
  )

  return deletePartnerController
}
