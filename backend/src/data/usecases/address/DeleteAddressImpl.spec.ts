import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type IdValidator,
  type FindOneAddressRepository,
  type DeleteAddressRepository
} from '../../protocols'
import { DeleteAddressImpl } from './DeleteAddressImpl'

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

  class DeleteAddressRepositoryStub implements DeleteAddressRepository {
    async delete (_request: DeleteAddressRepository.Request): DeleteAddressRepository.Response {}
  }

  const idValidatorStub = new IdValidatorStub()
  const findOneAddressRepositoryStub = new FindOneAddressRepositoryStub()
  const deleteAddressRepositoryStub = new DeleteAddressRepositoryStub()

  const SUT = new DeleteAddressImpl(
    idValidatorStub,
    findOneAddressRepositoryStub,
    deleteAddressRepositoryStub
  )

  return {
    SUT,

    idValidatorStub,
    findOneAddressRepositoryStub,
    deleteAddressRepositoryStub
  }
}

describe('FindOneAddressImpl', () => {
  it('should successfully delete an address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = 'SUCCESS'

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return INVALID_REQUEST if id validation returns error', async () => {
    const { SUT, idValidatorStub } = getSUTEnvironment()

    jest.spyOn(idValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      errorMessage: 'Invalid ID'
    })

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = 'INVALID_REQUEST'

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

    const expectedResponse = 'NOT_FOUND'

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

    const expectedResponse = 'NOT_FOUND'

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
