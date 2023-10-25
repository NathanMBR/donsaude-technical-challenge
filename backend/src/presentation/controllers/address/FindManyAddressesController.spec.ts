import {
  describe,
  it,
  expect
} from '@jest/globals'

import { type FindManyAddresses } from '../../../domain'
import { FindManyAddressesController } from './FindManyAddressesController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class FindManyAddressesStub implements FindManyAddresses {
    async execute (_request: FindManyAddresses.Request): FindManyAddresses.Response {
      return {
        currentPage: 1,
        lastPage: 1,
        quantityPerPage: 1,
        total: 1,
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
    }
  }

  const findManyAddressesStub = new FindManyAddressesStub()

  const SUT = new FindManyAddressesController(findManyAddressesStub)

  return {
    SUT,

    findManyAddressesStub
  }
}

describe('FindManyAddressesController', () => {
  it('should successfully find all addresses', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      query: {
        page: 1,
        quantity: 1,
        search: 'test_search'
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 200,
      body: {
        currentPage: 1,
        lastPage: 1,
        quantityPerPage: 1,
        total: 1,
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
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
