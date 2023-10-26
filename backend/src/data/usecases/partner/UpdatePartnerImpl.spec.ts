import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import {
  type IdValidator,
  type UpdatePartnerValidator,
  type FindOneAddressRepository,
  type FindOnePartnerRepository,
  type UpdatePartnerRepository
} from '../../protocols'
import { UpdatePartnerImpl } from './UpdatePartnerImpl'

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

  class UpdatePartnerValidatorStub implements UpdatePartnerValidator {
    validate (_request: UpdatePartnerValidator.Request): UpdatePartnerValidator.Response {
      return {
        success: true,
        data: {
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

  class UpdatePartnerRepositoryStub implements UpdatePartnerRepository {
    async update (_request: UpdatePartnerRepository.Request): UpdatePartnerRepository.Response {
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
  const updatePartnerValidatorStub = new UpdatePartnerValidatorStub()
  const findOneAddressRepositoryStub = new FindOneAddressRepositoryStub()
  const findOnePartnerRepositoryStub = new FindOnePartnerRepositoryStub()
  const updatePartnerRepositoryStub = new UpdatePartnerRepositoryStub()

  const SUT = new UpdatePartnerImpl(
    idValidatorStub,
    updatePartnerValidatorStub,
    findOneAddressRepositoryStub,
    findOnePartnerRepositoryStub,
    updatePartnerRepositoryStub
  )

  return {
    SUT,

    idValidatorStub,
    updatePartnerValidatorStub,
    findOneAddressRepositoryStub,
    findOnePartnerRepositoryStub,
    updatePartnerRepositoryStub
  }
}

describe('UpdatePartnerImpl', () => {
  it('should successfully update a partner', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1,
      name: 'test_name',
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
      id: 1,
      name: 'test_name',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = await SUT.execute(SUTRequest)

    expect(SUTResponse).not.toHaveProperty('password')
  })

  it('should return INVALID_REQUEST if id validation returns error', async () => {
    const { SUT, idValidatorStub } = getSUTEnvironment()

    jest.spyOn(idValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      errorMessage: 'Test error'
    })

    const SUTRequest = {
      id: 1,
      name: 'test_name',
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

  it('should return INVALID_REQUEST if partner validation returns error', async () => {
    const { SUT, updatePartnerValidatorStub } = getSUTEnvironment()

    jest.spyOn(updatePartnerValidatorStub, 'validate').mockReturnValueOnce({
      success: false,
      errorMessage: 'Test error'
    })

    const SUTRequest = {
      id: 1,
      name: 'test_name',
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

    jest.spyOn(findOneAddressRepositoryStub, 'findOne').mockReturnValueOnce(
      Promise.resolve(null)
    )

    const SUTRequest = {
      id: 1,
      name: 'test_name',
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

  it('should return PARTNER_NOT_FOUND if find one partner returns null', async () => {
    const { SUT, findOnePartnerRepositoryStub } = getSUTEnvironment()

    jest.spyOn(findOnePartnerRepositoryStub, 'findOne').mockReturnValueOnce(
      Promise.resolve(null)
    )

    const SUTRequest = {
      id: 1,
      name: 'test_name',
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
      type: 'PARTNER_NOT_FOUND'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
