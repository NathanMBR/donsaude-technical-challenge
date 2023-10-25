import {
  ZodCreateAddressValidator,
  PrismaAddressRepository
} from '../../../infra'
import { prisma } from '../../config'
import { CreateAddressImpl } from '../../../data'
import { CreateAddressController } from '../../../presentation'
import { ErrorHandlerControllerDecorator } from '../../decorators'

export const makeCreateAddressController = () => {
  const createAddressValidator = new ZodCreateAddressValidator()

  const createAddressRepository = new PrismaAddressRepository(prisma)

  const createAddress = new CreateAddressImpl(
    createAddressValidator,
    createAddressRepository
  )

  const createAddressController = new ErrorHandlerControllerDecorator(
    new CreateAddressController(createAddress)
  )

  return createAddressController
}
