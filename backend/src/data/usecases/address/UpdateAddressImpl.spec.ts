import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type IdValidator,
  type UpdateAddressValidator,
  type FindOneAddressRepository,
  type UpdateAddressRepository
} from '../../protocols'
import { UpdateAddressImpl } from './UpdateAddressImpl'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class IdValidatorStub implements IdValidator {
    validate (_request: IdValidator.Request): IdValidator.Response {
      return {
        success: true,
        data: 1
      }
    }
  }

  class UpdateAddressValidatorStub implements UpdateAddressValidator {
    validate (_request: UpdateAddressValidator.Request): UpdateAddressValidator.Response {
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

  class FindOneAddressRepositoryStub implements FindOneAddressRepository {
    async findOne (_request: FindOneAddressRepository.Request): FindOneAddressRepository.Response {
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

  class UpdateAddressRepositoryStub implements UpdateAddressRepository {
    async create (_request: UpdateAddressRepository.Request): UpdateAddressRepository.Response {
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

  const idValidatorStub = new IdValidatorStub()
  const updateAddressValidatorStub = new UpdateAddressValidatorStub()
  const findOneAddressRepositoryStub = new FindOneAddressRepositoryStub()
  const updateAddressRepositoryStub = new UpdateAddressRepositoryStub()

  const SUT = new UpdateAddressImpl(
    idValidatorStub,
    updateAddressValidatorStub,
    findOneAddressRepositoryStub,
    updateAddressRepositoryStub
  )

  return {
    SUT,

    idValidatorStub,
    updateAddressValidatorStub,
    findOneAddressRepositoryStub,
    updateAddressRepositoryStub
  }
}

describe('UpdateAddressImpl', () => {
  it('should successfully update an address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1,
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return INVALID_REQUEST if id validation returns error', async () => {
    const { SUT, idValidatorStub } = getSUTEnvironment()

    jest.spyOn(idValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      errorMessage: 'Test error'
    })

    const SUTRequest = {
      id: 1,
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
      type: 'INVALID_REQUEST',
      message: 'Test error'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return INVALID_REQUEST if address validation returns error', async () => {
    const { SUT, updateAddressValidatorStub } = getSUTEnvironment()

    jest.spyOn(updateAddressValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      errorMessage: 'Test error'
    })

    const SUTRequest = {
      id: 1,
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
      type: 'INVALID_REQUEST',
      message: 'Test error'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return NOT_FOUND if find one address returns null', async () => {
    const { SUT, findOneAddressRepositoryStub } = getSUTEnvironment()

    jest.spyOn(findOneAddressRepositoryStub, 'findOne').mockReturnValueOnce(
      Promise.resolve(null)
    )

    const SUTRequest = {
      id: 1,
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
      type: 'NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
