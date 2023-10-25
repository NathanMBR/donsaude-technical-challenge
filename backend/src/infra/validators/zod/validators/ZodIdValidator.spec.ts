import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import { ZodError } from 'zod'

import { ZodIdValidator } from './ZodIdValidator'
import { zodIdSchema } from '../schemas'

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

    const expectedResponse = true

    expect(SUTResponse).toBe(expectedResponse)
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

    const expectedResponse = false

    expect(SUTResponse).toBe(expectedResponse)
  })

  it('should not call unsafe zod method', () => {
    const { SUT } = getSUTEnvironment()

    const parseSpy = jest.spyOn(zodIdSchema, 'parse')

    const SUTRequest = 1

    SUT.validate(SUTRequest)

    expect(parseSpy).not.toHaveBeenCalled()
  })
})
