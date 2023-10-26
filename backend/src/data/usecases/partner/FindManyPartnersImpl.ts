import { type FindManyPartners } from '../../../domain'
import {
  type PaginationValidator,
  type FindManyPartnersRepository,
  type CountManyPartnersRepository
} from '../../protocols'
import {
  getRepositoryPaginationRequest,
  getRepositoryPaginationResponse
} from '../../helpers'

export class FindManyPartnersImpl implements FindManyPartners {
  constructor (
    private readonly paginationValidator: PaginationValidator,
    private readonly findManyPartnersRepository: FindManyPartnersRepository,
    private readonly countManyPartnersRepository: CountManyPartnersRepository
  ) {}

  async execute (request: FindManyPartners.Request): FindManyPartners.Response {
    const paginationParams = this.paginationValidator.validate(request)

    const searchParams = getRepositoryPaginationRequest({
      page: paginationParams.page,
      quantity: paginationParams.quantity
    })

    const [partners, partnersCount] = await Promise.all([
      this.findManyPartnersRepository.findMany({
        ...searchParams,
        search: paginationParams.search
      }),
      this.countManyPartnersRepository.countMany({ search: paginationParams.search })
    ])

    const partnersWithoutPassword = partners.map(({ password, ...partnerWithoutPassword }) => partnerWithoutPassword)

    const paginatedPartners = getRepositoryPaginationResponse({
      take: searchParams.take,
      skip: searchParams.skip,
      count: partnersCount,
      data: partnersWithoutPassword
    })

    return paginatedPartners
  }
}
