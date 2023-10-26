import { type PrismaClient } from '@prisma/client'

import { type CreatePartnerRepository } from '../../../data'

export class PrismaPartnerRepository implements CreatePartnerRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async create (request: CreatePartnerRepository.Request): CreatePartnerRepository.Response {
    const partner = await this.prisma.partner.create({
      data: request
    })

    return partner
  }
}
