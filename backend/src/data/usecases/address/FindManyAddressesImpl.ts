import { type FindManyAddresses } from '../../../domain'
import {
  type PaginationValidator,
  type FindManyAddressesRepository,
  type CountManyAddressesRepository
} from '../../protocols'
import { getRepositoryPaginationResponse } from '../../helpers'

export class FindManyAddressesImpl implements FindManyAddresses {
  constructor (
    private readonly paginationValidator: PaginationValidator,
    private readonly findManyAddressesRepository: FindManyAddressesRepository,
    private readonly countManyAddressesRepository: CountManyAddressesRepository
  ) {}

  async execute (request: FindManyAddresses.Request): FindManyAddresses.Response {
    const paginationParams = this.paginationValidator.validate(request)

    const [addresses, addressesCount] = await Promise.all([
      this.findManyAddressesRepository.findMany(paginationParams),
      this.countManyAddressesRepository.countMany({ search: paginationParams.search })
    ])

    const paginatedAddresses = getRepositoryPaginationResponse({
      take: paginationParams.take,
      skip: paginationParams.skip,
      count: addressesCount,
      data: addresses
    })

    return paginatedAddresses
  }
}
