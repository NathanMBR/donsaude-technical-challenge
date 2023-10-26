import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type UpdatePartner } from '../../../domain'
import { UpdatePartnerController } from './UpdatePartnerController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class UpdatePartnerStub implements UpdatePartner {
    async execute (_request: UpdatePartner.Request): UpdatePartner.Response {
      return {
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
    }
  }

  const updatePartnerStub = new UpdatePartnerStub()

  const SUT = new UpdatePartnerController(updatePartnerStub)

  return {
    SUT,

    updatePartnerStub
  }
}

describe('UpdatePartnerController', () => {
  it('should successfully update a partner', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      body: {
        name: 'test_name',
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
      statusCode: 200,
      body: {
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

  it('should return 400 if usecase returns INVALID_REQUEST', async () => {
    const { SUT, updatePartnerStub } = getSUTEnvironment()

    jest.spyOn(updatePartnerStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'INVALID_REQUEST',
        message: 'Test error message'
      })
    )

    const SUTRequest = {
      body: {
        name: 'test_name',
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

  it('should return 404 if usecase returns PARTNER_NOT_FOUND', async () => {
    const { SUT, updatePartnerStub } = getSUTEnvironment()

    jest.spyOn(updatePartnerStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'PARTNER_NOT_FOUND'
      })
    )

    const SUTRequest = {
      body: {
        name: 'test_name',
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
        message: 'Partner not found'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return 404 if usecase returns ADDRESS_NOT_FOUND', async () => {
    const { SUT, updatePartnerStub } = getSUTEnvironment()

    jest.spyOn(updatePartnerStub, 'execute').mockReturnValueOnce(
      Promise.resolve({
        type: 'ADDRESS_NOT_FOUND'
      })
    )

    const SUTRequest = {
      body: {
        name: 'test_name',
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
