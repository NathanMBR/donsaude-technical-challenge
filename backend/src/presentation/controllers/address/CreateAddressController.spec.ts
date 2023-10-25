import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type CreateAddress } from '../../../domain'
import { CreateAddressController } from './CreateAddressController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class CreateAddressStub implements CreateAddress {
    async execute (_request: CreateAddress.Request): CreateAddress.Response {
      return {
        success: true,
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

  const createAddressStub = new CreateAddressStub()

  const SUT = new CreateAddressController(createAddressStub)

  return {
    SUT,

    createAddressStub
  }
}

describe('CreateAddressController', () => {
  it('should successfully create an address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      body: {
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
      statusCode: 201,
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
    const { SUT, createAddressStub } = getSUTEnvironment()

    jest.spyOn(createAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        success: false,
        error: {
          type: 'INVALID_REQUEST',
          message: 'Test error message'
        }
      })
    )

    const SUTRequest = {
      body: {
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

  it('should return 500 if usecase returns unexpected type', async () => {
    const { SUT, createAddressStub } = getSUTEnvironment()

    jest.spyOn(createAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        success: false,
        error: {
          type: 'unexpected' as any,
          message: 'Test error message'
        }
      })
    )

    const SUTRequest = {
      body: {
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
      statusCode: 500,
      body: {
        error: 'Internal Server Error'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
