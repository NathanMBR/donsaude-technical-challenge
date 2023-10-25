import { type PrismaClient } from '@prisma/client'
import { type CreateAddressRepository } from '../../../data'

export class PrismaAddressRepository implements CreateAddressRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async create (request: CreateAddressRepository.Request): CreateAddressRepository.Response {
    const address = await this.prisma.address.create({
      data: request
    })

    return address
  }
}
