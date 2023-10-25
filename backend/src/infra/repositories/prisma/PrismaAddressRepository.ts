import { type PrismaClient } from '@prisma/client'
import {
  type CreateAddressRepository,
  type FindOneAddressRepository,
  type FindManyAddressesRepository,
  type CountManyAddressesRepository
} from '../../../data'

export class PrismaAddressRepository implements
  CreateAddressRepository,
  FindOneAddressRepository,
  FindManyAddressesRepository,
  CountManyAddressesRepository
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

  async findMany (request: FindManyAddressesRepository.Request): FindManyAddressesRepository.Response {
    const {
      take,
      skip,
      search
    } = request

    const addresses = await this.prisma.address.findMany({
      where: {
        OR: [{
          postalCode: {
            contains: search
          }
        }, {
          street: {
            contains: search
          }
        }, {
          number: {
            contains: search
          }
        }, {
          neighborhood: {
            contains: search
          }
        }, {
          complement: {
            contains: search
          }
        }, {
          city: {
            contains: search
          }
        }, {
          state: {
            contains: search
          }
        }],

        deletedAt: null
      },

      take,
      skip
    })

    return addresses
  }

  async countMany (request: CountManyAddressesRepository.Request): CountManyAddressesRepository.Response {
    const { search } = request

    const addressesCount = await this.prisma.address.count({
      where: {
        OR: [{
          postalCode: {
            contains: search
          }
        }, {
          street: {
            contains: search
          }
        }, {
          number: {
            contains: search
          }
        }, {
          neighborhood: {
            contains: search
          }
        }, {
          complement: {
            contains: search
          }
        }, {
          city: {
            contains: search
          }
        }, {
          state: {
            contains: search
          }
        }],

        deletedAt: null
      }
    })

    return addressesCount
  }
}
