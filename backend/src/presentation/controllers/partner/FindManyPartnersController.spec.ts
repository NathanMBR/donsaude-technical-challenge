import {
  describe,
  it,
  expect
} from '@jest/globals'

import { type FindManyPartners } from '../../../domain'
import { FindManyPartnersController } from './FindManyPartnersController'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class FindManyPartnersStub implements FindManyPartners {
    async execute (_request: FindManyPartners.Request): FindManyPartners.Response {
      return {
        currentPage: 1,
        lastPage: 1,
        quantityPerPage: 1,
        total: 1,
        data: [{
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
        }]
      }
    }
  }

  const findManyPartnersStub = new FindManyPartnersStub()

  const SUT = new FindManyPartnersController(findManyPartnersStub)

  return {
    SUT,

    findManyPartnersStub
  }
}

describe('FindManyPartnersController', () => {
  it('should successfully find many partners', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      query: {
        page: 1,
        quantity: 1,
        search: 'test_search'
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 200,
      body: {
        currentPage: 1,
        lastPage: 1,
        quantityPerPage: 1,
        total: 1,
        data: [{
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
        }]
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
