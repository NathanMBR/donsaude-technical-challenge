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

createSpy.mockImplementation(jest.fn(async () => getStubPartner()) as any)

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
