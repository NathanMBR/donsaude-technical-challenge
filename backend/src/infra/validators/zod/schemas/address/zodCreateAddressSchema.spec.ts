import {
  describe,
  it,
  expect
} from '@jest/globals'
import {
  type SafeParseSuccess,
  type SafeParseError,
  type z as zod
} from 'zod'

import { zodCreateAddressSchema } from './zodCreateAddressSchema'

type SchemaInfer = zod.infer<typeof zodCreateAddressSchema>
type SUTSuccessResponse = SafeParseSuccess<SchemaInfer>
type SUTFailResponse = SafeParseError<SchemaInfer>

/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('zodCreateAddressSchema', () => {
  it('should successfully validate a create address payload', () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTSuccessResponse

    expect(SUTResponse.success).toBe(true)
    expect(SUTResponse.data).toEqual(SUTRequest)
  })

  it('should successfully validate a create address payload with null values', () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: null,
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTSuccessResponse

    expect(SUTResponse.success).toBe(true)
    expect(SUTResponse.data).toEqual(SUTRequest)
  })

  it('should successfully validate a create address payload with undefined values', () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      // complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTSuccessResponse

    const expectedResponse = {
      ...SUTResponse.data,
      complement: null
    }

    expect(SUTResponse.success).toBe(true)
    expect(SUTResponse.data).toEqual(expectedResponse)
  })

  it("should fail validation if postalCode isn't defined", () => {
    const SUTRequest = {
      // postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('postalCode is required')
  })

  it("should fail validation if postalCode isn't a string", () => {
    const SUTRequest = {
      postalCode: 1,
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('postalCode must be a string')
  })

  it("should fail validation if street isn't defined", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      // street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('street is required')
  })

  it("should fail validation if street isn't a string", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 1,
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('street must be a string')
  })

  it("should fail validation if number isn't defined", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      // number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('number is required')
  })

  it("should fail validation if number isn't a string", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 1,
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('number must be a string')
  })

  it("should fail validation if neighborhood isn't defined", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      // neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('neighborhood is required')
  })

  it("should fail validation if neighborhood isn't a string", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 1,
      complement: 'test_complement',
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('neighborhood must be a string')
  })

  it("should fail validation if complement isn't a string", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 1,
      city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('complement must be a string')
  })

  it("should fail validation if city isn't defined", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      // city: 'test_city',
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('city is required')
  })

  it("should fail validation if city isn't a string", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 1,
      state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('city must be a string')
  })

  it("should fail validation if state isn't defined", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city'
      // state: 'test_state'
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse

    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('state is required')
  })

  it("should fail validation if state isn't a string", () => {
    const SUTRequest = {
      postalCode: 'test_postal_code',
      street: 'test_street',
      number: 'test_number',
      neighborhood: 'test_neighborhood',
      complement: 'test_complement',
      city: 'test_city',
      state: 1
    }

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('state must be a string')
  })

  it("should fail validation if payload isn't defined", () => {
    const SUTRequest = undefined

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('payload is required')
  })

  it("should fail validation if payload isn't an object", () => {
    const SUTRequest = 'test_payload'

    const SUTResponse = zodCreateAddressSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('payload must be an object')
  })
})
