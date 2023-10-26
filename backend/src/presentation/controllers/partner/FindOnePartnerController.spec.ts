import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type FindOnePartner } from '../../../domain'
import { FindOnePartnerController } from './FindOnePartnerController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class FindOnePartnerStub implements FindOnePartner {
    async execute (_request: FindOnePartner.Request): FindOnePartner.Response {
      return {
        type: 'SUCCESS',
        data: {
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
  }

  const findOnePartnerStub = new FindOnePartnerStub()

  const SUT = new FindOnePartnerController(findOnePartnerStub)

  return {
    SUT,

    findOnePartnerStub
  }
}

describe('FindOnePartnerController', () => {
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return 400 if usecase returns INVALID_REQUEST', async () => {
    const { SUT, findOnePartnerStub } = getSUTEnvironment()

    jest.spyOn(findOnePartnerStub, 'execute').mockReturnValueOnce(
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
    const { SUT, findOnePartnerStub } = getSUTEnvironment()

    jest.spyOn(findOnePartnerStub, 'execute').mockReturnValueOnce(
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
        message: 'Partner not found'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
