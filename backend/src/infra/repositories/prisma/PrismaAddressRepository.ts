import { type PrismaClient } from '@prisma/client'

import {
  type CreateAddressRepository,
  type FindOneAddressRepository,
  type FindManyAddressesRepository,
  type CountManyAddressesRepository
} from '../../../data'

const columnsToSearch = [
  'postalCode',
  'street',
  'number',
  'neighborhood',
  'complement',
  'city',
  'state'
]

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

    const searchPattern = {
      contains: search
    }

    const addresses = await this.prisma.address.findMany({
      where: {
        OR: search
          ? columnsToSearch.map(column => ({
            [column]: searchPattern
          }))
          : undefined,

        deletedAt: null
      },

      take,
      skip
    })

    return addresses
  }

  async countMany (request: CountManyAddressesRepository.Request): CountManyAddressesRepository.Response {
    const { search } = request

    const searchPattern = {
      contains: search
    }

    const addressesCount = await this.prisma.address.count({
      where: {
        OR: search
          ? columnsToSearch.map(column => ({
            [column]: searchPattern
          }))
          : undefined,

        deletedAt: null
      }
    })

    return addressesCount
  }
}
