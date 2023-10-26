import { type PrismaClient } from '@prisma/client'

import {
  type CreatePartnerRepository,
  type FindOnePartnerByEmailRepository,
  type FindOnePartnerRepository,
  type FindManyPartnersRepository,
  type CountManyPartnersRepository
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
  FindOnePartnerByEmailRepository,
  FindOnePartnerRepository,
  FindManyPartnersRepository,
  CountManyPartnersRepository
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

  async findOneByEmail (request: FindOnePartnerByEmailRepository.Request): FindOnePartnerByEmailRepository.Response {
    const { email } = request

    const partner = await this.prisma.partner.findFirst({
      where: {
        email,
        deletedAt: null
      }
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

  async countMany (request: CountManyPartnersRepository.Request): CountManyPartnersRepository.Response {
    const { search } = request

    const searchPattern = {
      contains: search
    }

    const partnersCount = await this.prisma.partner.count({
      where: {
        OR: search
          ? columnsToSearch.map(column => ({
            [column]: searchPattern
          }))
          : undefined,

        deletedAt: null
      }
    })

    return partnersCount
  }
}
