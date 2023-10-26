import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import { ZodError } from 'zod'

import { ZodUpdateAddressValidator } from './ZodUpdateAddressValidator'
import { zodUpdateAddressSchema } from '../../schemas'
import { ZodValidationFailureWithoutIssueError } from '../../errors'

const getSUTEnvironment = () => {
  const SUT = new ZodUpdateAddressValidator()

  return {
    SUT
  }
}

describe('ZodUpdateAddressValidator', () => {
  it('should successfully validate a update address payload', () => {
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

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      success: true,
      data: SUTRequest
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error if validation fails', () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(zodUpdateAddressSchema, 'safeParse').mockReturnValueOnce({
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
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      success: false,
      errorMessage: 'Test error'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should throw error if validations fails without issue', () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(zodUpdateAddressSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new ZodError([])
    })

    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const getSUTResponse = () => SUT.validate(SUTRequest)

    const error = new ZodValidationFailureWithoutIssueError()

    expect(getSUTResponse).toThrowError(error)
  })

  it('should not call unsafe zod method', () => {
    const { SUT } = getSUTEnvironment()

    const parseSpy = jest.spyOn(zodUpdateAddressSchema, 'parse')

    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    SUT.validate(SUTRequest)

    expect(parseSpy).not.toHaveBeenCalled()
  })
})
