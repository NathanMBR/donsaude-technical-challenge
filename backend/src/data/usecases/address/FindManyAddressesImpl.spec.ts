import {
  describe,
  it,
  expect
} from '@jest/globals'

import {
  type PaginationValidator,
  type FindManyAddressesRepository,
  type CountManyAddressesRepository
} from '../../protocols'
import { FindManyAddressesImpl } from './FindManyAddressesImpl'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class PaginationValidatorStub implements PaginationValidator {
    validate (_request: PaginationValidator.Request): PaginationValidator.Response {
      return {
        take: 10,
        skip: 10,
        search: 'test_search'
      }
    }
  }

  class FindManyAddressesRepositoryStub implements FindManyAddressesRepository {
    async findMany (_request: FindManyAddressesRepository.Request): FindManyAddressesRepository.Response {
      return [
        {
          id: 1,
          postalCode: 'test_postal_code',
          street: 'test_street',
          number: 'test_number',
          neighborhood: 'test_neighborhood',
          complement: 'test_complement',
          city: 'test_city',
          state: 'test_state',
          createdAt: globalDate,
          updatedAt: globalDate,
          deletedAt: null
        }
      ]
    }
  }

  class CountManyAddressesRepositoryStub implements CountManyAddressesRepository {
    async countMany (_request: CountManyAddressesRepository.Request): CountManyAddressesRepository.Response {
      return 100
    }
  }

  const paginationValidatorStub = new PaginationValidatorStub()
  const findManyAddressesRepositoryStub = new FindManyAddressesRepositoryStub()
  const countManyAddressesRepositoryStub = new CountManyAddressesRepositoryStub()

  const SUT = new FindManyAddressesImpl(
    paginationValidatorStub,
    findManyAddressesRepositoryStub,
    countManyAddressesRepositoryStub
  )

  return {
    SUT,

    paginationValidatorStub,
    findManyAddressesRepositoryStub,
    countManyAddressesRepositoryStub
  }
}

describe('FindManyAddressesImpl', () => {
  it('should successfully return paginated addresses', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      page: 1,
      quantity: 100
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      quantityPerPage: 10,
      total: 100,
      currentPage: 2,
      lastPage: 10,
      data: [{
        id: 1,
        postalCode: 'test_postal_code',
        street: 'test_street',
        number: 'test_number',
        neighborhood: 'test_neighborhood',
        complement: 'test_complement',
        city: 'test_city',
        state: 'test_state',
        createdAt: globalDate,
        updatedAt: globalDate,
        deletedAt: null
      }]
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
