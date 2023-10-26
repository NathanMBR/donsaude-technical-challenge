import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type CreatePartnerValidator,
  type FindOneAddressRepository,
  type CreatePartnerRepository
} from '../../protocols'
import { CreatePartnerImpl } from './CreatePartnerImpl'

const globalDate = new Date()

const getSUTEnvironment = () => {
  class CreatePartnerValidatorStub implements CreatePartnerValidator {
    validate (_request: CreatePartnerValidator.Request): CreatePartnerValidator.Response {
      return {
        success: true,
        data: {
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

  class CreatePartnerRepositoryStub implements CreatePartnerRepository {
    async create (_request: CreatePartnerRepository.Request): CreatePartnerRepository.Response {
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

  const createPartnerValidatorStub = new CreatePartnerValidatorStub()
  const findOneAddressRepositoryStub = new FindOneAddressRepositoryStub()
  const createPartnerRepositoryStub = new CreatePartnerRepositoryStub()

  const SUT = new CreatePartnerImpl(
    createPartnerValidatorStub,
    findOneAddressRepositoryStub,
    createPartnerRepositoryStub
  )

  return {
    SUT,

    createPartnerValidatorStub,
    findOneAddressRepositoryStub,
    createPartnerRepositoryStub
  }
}

describe('CreatePartnerImpl', () => {
  it('should successfully create a partner', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
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

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return INVALID_REQUEST if validation returns error', async () => {
    const { SUT, createPartnerValidatorStub } = getSUTEnvironment()

    jest.spyOn(createPartnerValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      errorMessage: 'Test error'
    })

    const SUTRequest = {
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

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      type: 'INVALID_REQUEST',
      message: 'Test error'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return ADDRESS_NOT_FOUND if find one address returns null', async () => {
    const { SUT, findOneAddressRepositoryStub } = getSUTEnvironment()

    jest.spyOn(findOneAddressRepositoryStub, 'findOne').mockReturnValueOnce(Promise.resolve(null))

    const SUTRequest = {
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

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      type: 'ADDRESS_NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return ADDRESS_NOT_FOUND if address deletedAt property is defined', async () => {
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

    const SUTResponse = await SUT.execute(SUTRequest)

    const expectedResponse = {
      type: 'ADDRESS_NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
