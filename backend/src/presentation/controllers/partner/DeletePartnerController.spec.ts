import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type DeletePartner } from '../../../domain'
import { DeletePartnerController } from './DeletePartnerController'

const getSUTEnvironment = () => {
  class DeletePartnerStub implements DeletePartner {
    async execute (_request: DeletePartner.Request): DeletePartner.Response {
      return 'SUCCESS'
    }
  }

  const deletePartnerStub = new DeletePartnerStub()

  const SUT = new DeletePartnerController(deletePartnerStub)

  return {
    SUT,

    deletePartnerStub
  }
}

describe('DeletePartnerController', () => {
  it('should successfully find delete partner', async () => {
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
    const { SUT, deletePartnerStub } = getSUTEnvironment()

    jest.spyOn(deletePartnerStub, 'execute').mockReturnValueOnce(
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
    const { SUT, deletePartnerStub } = getSUTEnvironment()

    jest.spyOn(deletePartnerStub, 'execute').mockReturnValueOnce(
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
        message: 'Partner not found'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
