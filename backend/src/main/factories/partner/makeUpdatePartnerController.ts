import {
  ZodIdValidator,
  ZodUpdatePartnerValidator,
  PrismaAddressRepository,
  PrismaPartnerRepository
} from '../../../infra'
import { prisma } from '../../config'
import { UpdatePartnerImpl } from '../../../data'
import { UpdatePartnerController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeUpdatePartnerController = () => {
  const idValidator = new ZodIdValidator()
  const updatePartnerValidator = new ZodUpdatePartnerValidator()

  const findOneAddressRepository = new PrismaAddressRepository(prisma)
  const findOneAndUpdatePartnerRepository = new PrismaPartnerRepository(prisma)

  const updatePartner = new UpdatePartnerImpl(
    idValidator,
    updatePartnerValidator,
    findOneAddressRepository,
    findOneAndUpdatePartnerRepository,
    findOneAndUpdatePartnerRepository
  )

  const updatePartnerController = new ErrorHandlerControllerDecorator(
    new UpdatePartnerController(updatePartner)
  )

  return updatePartnerController
}
