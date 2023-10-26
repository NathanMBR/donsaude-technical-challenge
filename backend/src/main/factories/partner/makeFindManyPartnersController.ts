import {
  ZodPaginationValidator,
  PrismaPartnerRepository
} from '../../../infra'
import { prisma } from '../../config'
import { FindManyPartnersImpl } from '../../../data'
import { FindManyPartnersController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeFindManyPartnersController = () => {
  const paginationValidator = new ZodPaginationValidator()

  const findAndCountManyPartnersRepository = new PrismaPartnerRepository(prisma)

  const findManyPartners = new FindManyPartnersImpl(
    paginationValidator,
    findAndCountManyPartnersRepository,
    findAndCountManyPartnersRepository
  )

  const findManyPartnersController = new ErrorHandlerControllerDecorator(
    new FindManyPartnersController(findManyPartners)
  )

  return findManyPartnersController
}
