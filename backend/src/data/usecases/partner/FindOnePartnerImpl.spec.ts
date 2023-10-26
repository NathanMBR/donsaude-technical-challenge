import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type IdValidator,
  type FindOnePartnerRepository
} from '../../protocols'
import { FindOnePartnerImpl } from './FindOnePartnerImpl'

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

  const idValidatorStub = new IdValidatorStub()
  const findOnePartnerRepositoryStub = new FindOnePartnerRepositoryStub()

  const SUT = new FindOnePartnerImpl(
    idValidatorStub,
    findOnePartnerRepositoryStub
  )

  return {
    SUT,

    idValidatorStub,
    findOnePartnerRepositoryStub
  }
}

describe('FindOnePartnerImpl', () => {
  it('should successfully find one partner', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      type: 'SUCCESS',
      data: {
        id: 1,
        name: 'test_name',
        email: 'test_email',
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should not return password', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    expect(SUTResponse).not.toHaveProperty('password')
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

    const expectedResponse = {
      type: 'INVALID_REQUEST',
      message: 'Invalid ID'
    }

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

    const expectedResponse = {
      type: 'NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return NOT_FOUND if partner deletedAt is defined', async () => {
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

    const expectedResponse = {
      type: 'NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
