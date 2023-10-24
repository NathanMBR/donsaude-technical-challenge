import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type CreateAddressValidator,
  type CreateAddressRepository
} from '../../protocols'
import { CreateAddressImpl } from './CreateAddressImpl'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class CreateAddressValidatorStub implements CreateAddressValidator {
    validate (_request: CreateAddressValidator.Request): CreateAddressValidator.Response {
      return {
        success: true,
        data: {
          postalCode: 'test_postal_code',
          street: 'test_street',
          number: 'test_number',
          neighborhood: 'test_neighborhood',
          complement: 'test_complement',
          city: 'test_city',
          state: 'test_state'
        }
      }
    }
  }

  class CreateAddressRepositoryStub implements CreateAddressRepository {
    async create (_request: CreateAddressRepository.Request): CreateAddressRepository.Response {
      return {
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

  const createAddressValidatorStub = new CreateAddressValidatorStub()
  const createAddressRepositoryStub = new CreateAddressRepositoryStub()

  const SUT = new CreateAddressImpl(
    createAddressValidatorStub,
    createAddressRepositoryStub
  )

  return {
    SUT,

    createAddressValidatorStub,
    createAddressRepositoryStub
  }
}

describe('CreateAddressImpl', () => {
  it('should successfully create an address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error if validation returns INVALID_PROPERTY_TYPE', async () => {
    const { SUT, createAddressValidatorStub } = getSUTEnvironment()

    jest.spyOn(createAddressValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      error: {
        type: 'INVALID_PROPERTY_TYPE',
        message: 'Test error'
      }
    })

    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      success: false,
      error: {
        type: 'INVALID_REQUEST',
        message: 'Test error'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error if validation returns INVALID_POSTAL_CODE_FORMAT', async () => {
    const { SUT, createAddressValidatorStub } = getSUTEnvironment()

    jest.spyOn(createAddressValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      error: {
        type: 'INVALID_POSTAL_CODE_FORMAT',
        message: 'Test error'
      }
    })

    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      success: false,
      error: {
        type: 'INVALID_REQUEST',
        message: 'Test error'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
