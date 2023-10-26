import { UpdateAddressImpl } from '../../../data/usecases/address/UpdateAddressImpl'
import {
  ZodIdValidator,
  ZodUpdateAddressValidator,
  PrismaAddressRepository
} from '../../../infra'
import { prisma } from '../../config'
import { UpdateAddressController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeUpdateAddressController = () => {
  const idValidator = new ZodIdValidator()

  const addressValidator = new ZodUpdateAddressValidator()

  const findAndUpdateAddressRepository = new PrismaAddressRepository(prisma)

  const updateAddress = new UpdateAddressImpl(
    idValidator,
    addressValidator,
    findAndUpdateAddressRepository,
    findAndUpdateAddressRepository
  )

  const updateAddressController = new ErrorHandlerControllerDecorator(
    new UpdateAddressController(updateAddress)
  )

  return updateAddressController
}
