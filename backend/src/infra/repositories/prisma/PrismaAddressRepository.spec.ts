import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import { PrismaClient } from '@prisma/client'

import { PrismaAddressRepository } from './PrismaAddressRepository'

const prisma = new PrismaClient()
const globalDate = new Date()

const getStubAddress = () => ({
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
})

const createSpy = jest.spyOn(prisma.address, 'create')
const findUniqueSpy = jest.spyOn(prisma.address, 'findUnique')
const findManySpy = jest.spyOn(prisma.address, 'findMany')

createSpy.mockImplementation(jest.fn(async () => getStubAddress()) as any)
findUniqueSpy.mockImplementation(jest.fn(async () => getStubAddress()) as any)
findManySpy.mockImplementation(jest.fn(async () => [getStubAddress()]) as any)

const getSUTEnvironment = () => {
  const SUT = new PrismaAddressRepository(prisma)

  return {
    SUT
  }
}

describe('PrismaCreateAddressRepository', () => {
  it('should successfully create an address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = await SUT.create(SUTRequest)

    const expectedResponse = {
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

    expect(SUTResponse).toEqual(expectedResponse)
  })
})

describe('PrismaFindOneAddressRepository', () => {
  it('should successfully find one address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.findOne(SUTRequest)

    const expectedResponse = {
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

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return null if search returns null', async () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(prisma.address, 'findUnique').mockImplementationOnce(jest.fn(async () => null) as any)

    const SUTRequest = {
      id: 1
    }

    const SUTResponse = await SUT.findOne(SUTRequest)

    const expectedResponse = null

    expect(SUTResponse).toEqual(expectedResponse)
  })
})

describe('PrismaFindManyAddressesRepository', () => {
  it('should successfully find many addresses', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      take: 1,
      skip: 1,
      search: 'test_search'
    }

    const SUTResponse = await SUT.findMany(SUTRequest)

    const expectedResponse = [{
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
    }]

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should successfully find many addresses without optional parameters', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      take: 1,
      skip: 1
      // search: 'test_search'
    }

    const SUTResponse = await SUT.findMany(SUTRequest)

    const expectedResponse = [{
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
    }]

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
