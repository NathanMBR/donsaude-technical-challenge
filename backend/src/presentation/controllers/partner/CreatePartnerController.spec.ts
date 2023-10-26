import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type CreatePartner } from '../../../domain'
import { CreatePartnerController } from './CreatePartnerController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class CreatePartnerStub implements CreatePartner {
    async execute (_request: CreatePartner.Request): CreatePartner.Response {
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

  const createPartnerStub = new CreatePartnerStub()

  const SUT = new CreatePartnerController(createPartnerStub)

  return {
    SUT,

    createPartnerStub
  }
}

describe('CreatePartnerController', () => {
  it('should successfully create a partner', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      body: {
        name: 'test_name',
        email: 'test_email',
        password: 'test_password',
        category: 'test_category',
        cnpj: 'test_cnpj',
        phone: 'test_phone',
        cellphone: 'test_cellphone',
        clinicalManagerName: 'test_clinical_manager_name',
        financialManagerName: 'test_financial_manager_name',
        addressId: 1
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 201,
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
    const { SUT, createPartnerStub } = getSUTEnvironment()

    jest.spyOn(createPartnerStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'INVALID_REQUEST',
        message: 'Test error message'
      })
    )

    const SUTRequest = {
      body: {
        name: 'test_name',
        email: 'test_email',
        password: 'test_password',
        category: 'test_category',
        cnpj: 'test_cnpj',
        phone: 'test_phone',
        cellphone: 'test_cellphone',
        clinicalManagerName: 'test_clinical_manager_name',
        financialManagerName: 'test_financial_manager_name',
        addressId: 1
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

  it('should return 404 if usecase returns ADDRESS_NOT_FOUND', async () => {
    const { SUT, createPartnerStub } = getSUTEnvironment()

    jest.spyOn(createPartnerStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'ADDRESS_NOT_FOUND'
      })
    )

    const SUTRequest = {
      body: {
        name: 'test_name',
        email: 'test_email',
        password: 'test_password',
        category: 'test_category',
        cnpj: 'test_cnpj',
        phone: 'test_phone',
        cellphone: 'test_cellphone',
        clinicalManagerName: 'test_clinical_manager_name',
        financialManagerName: 'test_financial_manager_name',
        addressId: 1
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
