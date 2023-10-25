import { ZodPaginationValidator } from '../../../infra/validators/zod/validators/ZodPaginationValidator'
import { PrismaAddressRepository } from '../../../infra'
import { prisma } from '../../config'
import { FindManyAddressesImpl } from '../../../data'
import { FindManyAddressesController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeFindManyAddressesController = () => {
  const paginationValidator = new ZodPaginationValidator()

  const findAndCountManyAddressesRepository = new PrismaAddressRepository(prisma)

  const findManyAddresses = new FindManyAddressesImpl(
    paginationValidator,
    findAndCountManyAddressesRepository,
    findAndCountManyAddressesRepository
  )

  const findManyAddressesController = new ErrorHandlerControllerDecorator(
    new FindManyAddressesController(
      findManyAddresses
    )
  )

  return findManyAddressesController
}
