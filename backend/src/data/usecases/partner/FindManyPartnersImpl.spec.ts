import {
  describe,
  it,
  expect
} from '@jest/globals'

import {
  type PaginationValidator,
  type FindManyPartnersRepository,
  type CountManyPartnersRepository
} from '../../protocols'
import { FindManyPartnersImpl } from './FindManyPartnersImpl'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class PaginationValidatorStub implements PaginationValidator {
    validate (_request: PaginationValidator.Request): PaginationValidator.Response {
      return {
        page: 10,
        quantity: 10,
        search: 'test_search'
      }
    }
  }

  class FindManyPartnersRepositoryStub implements FindManyPartnersRepository {
    async findMany (_request: FindManyPartnersRepository.Request): FindManyPartnersRepository.Response {
      return [
        {
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
      ]
    }
  }

  class CountManyPartnersRepositoryStub implements CountManyPartnersRepository {
    async countMany (_request: CountManyPartnersRepository.Request): CountManyPartnersRepository.Response {
      return 100
    }
  }

  const paginationValidatorStub = new PaginationValidatorStub()
  const findManyPartnersRepositoryStub = new FindManyPartnersRepositoryStub()
  const countManyPartnersRepositoryStub = new CountManyPartnersRepositoryStub()

  const SUT = new FindManyPartnersImpl(
    paginationValidatorStub,
    findManyPartnersRepositoryStub,
    countManyPartnersRepositoryStub
  )

  return {
    SUT,

    paginationValidatorStub,
    findManyPartnersRepositoryStub,
    countManyPartnersRepositoryStub
  }
}

describe('FindManyPartnersImpl', () => {
  it('should successfully find many partners', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      page: 1,
      quantity: 100
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      quantityPerPage: 10,
      total: 100,
      currentPage: 10,
      lastPage: 10,
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should not return password', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      page: 1,
      quantity: 100
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    const doesAnyPartnerHavePassword = SUTResponse.data.some(partner => 'password' in partner)

    expect(doesAnyPartnerHavePassword).toBe(false)
  })
})
