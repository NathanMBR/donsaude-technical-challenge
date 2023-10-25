import { type PrismaClient } from '@prisma/client'
import {
  type CreateAddressRepository,
  type FindOneAddressRepository
} from '../../../data'

export class PrismaAddressRepository implements
  CreateAddressRepository,
  FindOneAddressRepository
{
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async create (request: CreateAddressRepository.Request): CreateAddressRepository.Response {
    const address = await this.prisma.address.create({
      data: request
    })

    return address
  }

  async findOne (request: FindOneAddressRepository.Request): FindOneAddressRepository.Response {
    const { id } = request

    const address = await this.prisma.address.findUnique({
      where: {
        id
      }
    })

    return address
  }
}
