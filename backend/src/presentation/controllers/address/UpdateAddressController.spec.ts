import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type UpdateAddress } from '../../../domain'
import { UpdateAddressController } from './UpdateAddressController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class UpdateAddressStub implements UpdateAddress {
    async execute (_request: UpdateAddress.Request): UpdateAddress.Response {
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

  const updateAddressStub = new UpdateAddressStub()

  const SUT = new UpdateAddressController(updateAddressStub)

  return {
    SUT,

    updateAddressStub
  }
}

describe('UpdateAddressController', () => {
  it('should successfully update an address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      body: {
        id: 1,
        postalCode: 'test_postal_code',
        street: 'test_street',
        number: 'test_number',
        neighborhood: 'test_neighborhood',
        complement: 'test_complement',
        city: 'test_city',
        state: 'test_state'
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
    const { SUT, updateAddressStub } = getSUTEnvironment()

    jest.spyOn(updateAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve({

        type: 'INVALID_REQUEST',
        message: 'Test error message'
      })
    )

    const SUTRequest = {
      body: {
        id: 1,
        postalCode: 'test_postal_code',
        street: 'test_street',
        number: 'test_number',
        neighborhood: 'test_neighborhood',
        complement: 'test_complement',
        city: 'test_city',
        state: 'test_state'
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 400,
      body: {
        error: 'Bad Request',
        message: 'Test error message'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return 404 if usecase returns NOT_FOUND', async () => {
    const { SUT, updateAddressStub } = getSUTEnvironment()

    jest.spyOn(updateAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'NOT_FOUND'
      })
    )

    const SUTRequest = {
      body: {
        id: 1,
        postalCode: 'test_postal_code',
        street: 'test_street',
        number: 'test_number',
        neighborhood: 'test_neighborhood',
        complement: 'test_complement',
        city: 'test_city',
        state: 'test_state'
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
