import { type PrismaClient } from '@prisma/client'

import {
  type CreatePartnerRepository,
  type FindOnePartnerRepository
} from '../../../data'

export class PrismaPartnerRepository implements
  CreatePartnerRepository,
  FindOnePartnerRepository
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
}
