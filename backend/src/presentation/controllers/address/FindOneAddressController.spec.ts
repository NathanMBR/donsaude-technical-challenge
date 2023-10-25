import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type FindOneAddress } from '../../../domain'
import { FindOneAddressController } from './FindOneAddressController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class FindOneAddressStub implements FindOneAddress {
    async execute (_request: FindOneAddress.Request): FindOneAddress.Response {
      return {
        type: 'SUCCESS',
        data: {
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
      }
    }
  }

  const findOneAddressStub = new FindOneAddressStub()

  const SUT = new FindOneAddressController(findOneAddressStub)

  return {
    SUT,

    findOneAddressStub
  }
}

describe('FindOneAddressController', () => {
  it('should successfully find one address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      params: {
        id: 1
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 200,
      body: {
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
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return 400 if usecase returns INVALID_REQUEST', async () => {
    const { SUT, findOneAddressStub } = getSUTEnvironment()

    jest.spyOn(findOneAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'INVALID_REQUEST',
        message: 'Invalid ID'
      })
    )

    const SUTRequest = {
      params: {
        id: 1
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 400,
      body: {
        error: 'Bad Request',
        message: 'Invalid ID'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return 404 if usecase returns NOT_FOUND', async () => {
    const { SUT, findOneAddressStub } = getSUTEnvironment()

    jest.spyOn(findOneAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'NOT_FOUND'
      })
    )

    const SUTRequest = {
      params: {
        id: 1
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 404,
      body: {
        error: 'Not Found',
        message: 'Address not found'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
