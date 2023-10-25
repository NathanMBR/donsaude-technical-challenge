import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import { ZodError } from 'zod'

import { ZodIdValidator } from './ZodIdValidator'
import { zodIdSchema } from '../schemas'
import { ZodValidationFailureWithoutIssueError } from '../errors'

const getSUTEnvironment = () => {
  const SUT = new ZodIdValidator()

  return {
    SUT
  }
}

describe('ZodIdValidator', () => {
  it('should successfully validate an id', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = 1

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      success: true,
      data: SUTRequest
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return false if validation fails', () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(zodIdSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new ZodError([
        {
          code: 'custom',
          path: ['test'],
          message: 'Test error'
        }
      ])
    })

    const SUTRequest = 1

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      success: false,
      errorMessage: 'Test error'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should throw error if validation fails without issue', () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(zodIdSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new ZodError([])
    })

    const SUTRequest = 1

    const getSUTResponse = () => SUT.validate(SUTRequest)

    const error = new ZodValidationFailureWithoutIssueError()

    expect(getSUTResponse).toThrow(error)
  })

  it('should not call unsafe zod method', () => {
    const { SUT } = getSUTEnvironment()

    const parseSpy = jest.spyOn(zodIdSchema, 'parse')

    const SUTRequest = 1

    SUT.validate(SUTRequest)

    expect(parseSpy).not.toHaveBeenCalled()
  })
})
