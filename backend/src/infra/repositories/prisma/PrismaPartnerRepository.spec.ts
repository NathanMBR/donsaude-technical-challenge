import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import { PrismaClient } from '@prisma/client'

import { PrismaPartnerRepository } from './PrismaPartnerRepository'

const prisma = new PrismaClient()
const globalDate = new Date()

const getStubPartner = () => ({
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
})

const createSpy = jest.spyOn(prisma.partner, 'create')
const findUniqueSpy = jest.spyOn(prisma.partner, 'findUnique')
const findManySpy = jest.spyOn(prisma.partner, 'findMany')

createSpy.mockImplementation(jest.fn(async () => getStubPartner()) as any)
findUniqueSpy.mockImplementation(jest.fn(async () => getStubPartner()) as any)
findManySpy.mockImplementation(jest.fn(async () => [getStubPartner()]) as any)

const getSUTEnvironment = () => {
  const SUT = new PrismaPartnerRepository(prisma)

  return {
    SUT
  }
}

describe('PrismaCreatePartnerRepository', () => {
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

    const SUTResponse = await SUT.create(SUTRequest)

    const expectedResponse = {
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

    expect(SUTResponse).toEqual(expectedResponse)
  })
})

describe('PrismaFindOnePartnerRepository', () => {
  it('should successfully find one partner', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.findOne(SUTRequest)

    const expectedResponse = {
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return null if search returns null', async () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(prisma.partner, 'findUnique').mockImplementationOnce(jest.fn(async () => null) as any)

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.findOne(SUTRequest)

    const expectedResponse = null

    expect(SUTResponse).toEqual(expectedResponse)
  })
})

describe('PrismaFindManyPartnersRepository', () => {
  it('should successfully find many partners', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      take: 1,
      skip: 1,
      search: 'test_search'
    }

    const SUTResponse = await SUT.findMany(SUTRequest)

    const expectedResponse = [{
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
    }]

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should successfully find many partners without optional parameters', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      take: 1,
      skip: 1
      // search: 'test_search'
    }

    const SUTResponse = await SUT.findMany(SUTRequest)

    const expectedResponse = [{
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
    }]

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
