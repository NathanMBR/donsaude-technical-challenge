import {
  ZodIdValidator,
  PrismaAddressRepository
} from '../../../infra'
import { prisma } from '../../config'
import { DeleteAddressImpl } from '../../../data'
import { DeleteAddressController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeDeleteAddressController = () => {
  const idValidator = new ZodIdValidator()

  const findAndDeleteAddressRepository = new PrismaAddressRepository(prisma)

  const deleteAddress = new DeleteAddressImpl(
    idValidator,
    findAndDeleteAddressRepository,
    findAndDeleteAddressRepository
  )

  const deleteAddressController = new ErrorHandlerControllerDecorator(
    new DeleteAddressController(deleteAddress)
  )

  return deleteAddressController
}
