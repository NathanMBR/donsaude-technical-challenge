import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import { ZodError } from 'zod'

import { ZodPaginationValidator } from './ZodPaginationValidator'
import { zodPaginationSchema } from '../schemas'

const getSUTEnvironment = () => {
  const SUT = new ZodPaginationValidator()

  return {
    SUT
  }
}

describe('ZodPaginationValidator', () => {
  it('should successfully validate a pagination', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      page: 17,
      quantity: 53,
      search: 'test'
    }

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      page: SUTRequest.page,
      quantity: SUTRequest.quantity,
      search: SUTRequest.search
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return default value if validation fails', () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(zodPaginationSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new ZodError([
        {
          code: 'custom',
          path: ['test'],
          message: 'Test error'
        }
      ])
    })

    const SUTRequest = {
      page: -3,
      quantity: 10.04,
      search: NaN
    }

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      page: 1,
      quantity: 10,
      search: undefined
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should not call unsafe zod method', () => {
    const { SUT } = getSUTEnvironment()

    const parseSpy = jest.spyOn(zodPaginationSchema, 'parse')

    const SUTRequest = 1

    SUT.validate(SUTRequest)

    expect(parseSpy).not.toHaveBeenCalled()
  })
})
