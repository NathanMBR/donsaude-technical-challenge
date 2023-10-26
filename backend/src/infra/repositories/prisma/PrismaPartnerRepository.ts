import { type PrismaClient } from '@prisma/client'

import {
  type CreatePartnerRepository,
  type FindOnePartnerRepository,
  type FindManyPartnersRepository
} from '../../../data'

const columnsToSearch = [
  'name',
  'email',
  'category',
  'cnpj',
  'phone',
  'cellphone',
  'clinicalManagerName',
  'financialManagerName'
]

export class PrismaPartnerRepository implements
  CreatePartnerRepository,
  FindOnePartnerRepository,
  FindManyPartnersRepository
{
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async create (request: CreatePartnerRepository.Request): CreatePartnerRepository.Response {
    const partner = await this.prisma.partner.create({
      data: request
    })

    return partner
  }

  async findOne (request: FindOnePartnerRepository.Request): FindOnePartnerRepository.Response {
    const { id } = request

    const partner = await this.prisma.partner.findUnique({
      where: {
        id
      }
    })

    return partner
  }

  async findMany (request: FindManyPartnersRepository.Request): FindManyPartnersRepository.Response {
    const {
      take,
      skip,
      search
    } = request

    const searchPattern = {
      contains: search
    }

    const partners = await this.prisma.partner.findMany({
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

    return partners
  }
}
