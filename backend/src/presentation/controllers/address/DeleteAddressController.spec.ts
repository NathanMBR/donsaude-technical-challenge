import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type DeleteAddress } from '../../../domain'
import { DeleteAddressController } from './DeleteAddressController'

const getSUTEnvironment = () => {
  class DeleteAddressStub implements DeleteAddress {
    async execute (_request: DeleteAddress.Request): DeleteAddress.Response {
      return 'SUCCESS'
    }
  }

  const deleteAddressStub = new DeleteAddressStub()

  const SUT = new DeleteAddressController(deleteAddressStub)

  return {
    SUT,

    deleteAddressStub
  }
}

describe('DeleteAddressController', () => {
  it('should successfully find delete address', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      params: {
        id: 1
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 204,
      body: undefined
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return 400 if usecase returns INVALID_REQUEST', async () => {
    const { SUT, deleteAddressStub } = getSUTEnvironment()

    jest.spyOn(deleteAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve('INVALID_REQUEST')
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
    const { SUT, deleteAddressStub } = getSUTEnvironment()

    jest.spyOn(deleteAddressStub, 'execute').mockReturnValueOnce(
      Promise.resolve('NOT_FOUND')
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
        message: 'Address not found'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
