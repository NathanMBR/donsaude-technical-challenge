import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type IdValidator,
  type FindOnePartnerRepository,
  type DeletePartnerRepository
} from '../../protocols'
import { DeletePartnerImpl } from './DeletePartnerImpl'

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

  class FindOnePartnerRepositoryStub implements FindOnePartnerRepository {
    async findOne (_request: FindOnePartnerRepository.Request): FindOnePartnerRepository.Response {
      return {
        id: 1,
        name: 'test_name',
        email: 'test_email',
        password: 'test_password',
        category: 'test_category',
        cnpj: 'test_cnpj',
        phone: 'test_phone',
        cellphone: 'test_cellphone',
        clinicalManagerName: 'test_clinical_manager_name',
        financialManagerName: 'test_financial_manager_name',
        addressId: 1,
        createdAt: globalDate,
        updatedAt: globalDate,
        deletedAt: null
      }
    }
  }

  class DeletePartnerRepositoryStub implements DeletePartnerRepository {
    async delete (_request: DeletePartnerRepository.Request): DeletePartnerRepository.Response {}
  }

  const idValidatorStub = new IdValidatorStub()
  const findOnePartnerRepositoryStub = new FindOnePartnerRepositoryStub()
  const deletePartnerRepositoryStub = new DeletePartnerRepositoryStub()

  const SUT = new DeletePartnerImpl(
    idValidatorStub,
    findOnePartnerRepositoryStub,
    deletePartnerRepositoryStub
  )

  return {
    SUT,

    idValidatorStub,
    findOnePartnerRepositoryStub,
    deletePartnerRepositoryStub
  }
}

describe('DeletePartnerImpl', () => {
  it('should successfully delete a partner', async () => {
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

  it('should return NOT_FOUND if partner is null', async () => {
    const { SUT, findOnePartnerRepositoryStub } = getSUTEnvironment()

    jest.spyOn(findOnePartnerRepositoryStub, 'findOne').mockReturnValueOnce(
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
    const { SUT, findOnePartnerRepositoryStub } = getSUTEnvironment()

    jest.spyOn(findOnePartnerRepositoryStub, 'findOne').mockReturnValueOnce(
      Promise.resolve({
        id: 1,
        name: 'test_name',
        email: 'test_email',
        password: 'test_password',
        category: 'test_category',
        cnpj: 'test_cnpj',
        phone: 'test_phone',
        cellphone: 'test_cellphone',
        clinicalManagerName: 'test_clinical_manager_name',
        financialManagerName: 'test_financial_manager_name',
        addressId: 1,
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
