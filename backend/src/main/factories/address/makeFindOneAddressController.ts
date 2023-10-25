import { prisma } from '../../config'
import {
  ZodIdValidator,
  PrismaAddressRepository
} from '../../../infra'
import { FindOneAddressImpl } from '../../../data'
import { FindOneAddressController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeFindOneAddressController = () => {
  const idValidator = new ZodIdValidator()

  const findOneAddressRepository = new PrismaAddressRepository(prisma)

  const findOneAddress = new FindOneAddressImpl(
    idValidator,
    findOneAddressRepository
  )

  const findOneAddressController = new ErrorHandlerControllerDecorator(
    new FindOneAddressController(findOneAddress)
  )

  return findOneAddressController
}
