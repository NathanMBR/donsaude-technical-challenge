import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type IdValidator,
  type FindOneAddressRepository
} from '../../protocols'
import { FindOneAddressImpl } from './FindOneAddressImpl'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class IdValidatorStub implements IdValidator {
    validate (_request: IdValidator.Request): IdValidator.Response {
      return true
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

  const idValidatorStub = new IdValidatorStub()
  const findOneAddressRepositoryStub = new FindOneAddressRepositoryStub()

  const SUT = new FindOneAddressImpl(
    idValidatorStub,
    findOneAddressRepositoryStub
  )

  return {
    SUT,

    idValidatorStub,
    findOneAddressRepositoryStub
  }
}

describe('FindOneAddressImpl', () => {
  it('should successfully find one address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1
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

  it('should return INVALID_REQUEST if id validation returns false', async () => {
    const { SUT, idValidatorStub } = getSUTEnvironment()

    jest.spyOn(idValidatorStub, 'validate').mockReturnValueOnce(false)

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      type: 'INVALID_REQUEST',
      message: 'Invalid ID'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return NOT_FOUND if address is null', async () => {
    const { SUT, findOneAddressRepositoryStub } = getSUTEnvironment()

    jest.spyOn(findOneAddressRepositoryStub, 'findOne').mockReturnValueOnce(
      Promise.resolve(null)
    )

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      type: 'NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return NOT_FOUND if deletedAt is defined', async () => {
    const { SUT, findOneAddressRepositoryStub } = getSUTEnvironment()

    jest.spyOn(findOneAddressRepositoryStub, 'findOne').mockReturnValueOnce(
      Promise.resolve({
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
        deletedAt: globalDate
      })
    )

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      type: 'NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
