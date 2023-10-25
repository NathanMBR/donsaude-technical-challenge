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

import { zodPaginationSchema } from './zodPaginationSchema'

type SchemaInfer = zod.infer<typeof zodPaginationSchema>
type SUTSuccessResponse = SafeParseSuccess<SchemaInfer>
type SUTFailResponse = SafeParseError<SchemaInfer>

/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('zodPaginationSchema', () => {
  it('should successfully validate pagination', () => {
    const SUTRequest = {
      page: 1,
      quantity: 10,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTSuccessResponse

    expect(SUTResponse.success).toBe(true)
  })

  it('should successfully validate pagination with string values', () => {
    const SUTRequest = {
      page: '1',
      quantity: '10',
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTSuccessResponse

    expect(SUTResponse.success).toBe(true)
  })

  it('should successfully validate pagination with undefined values', () => {
    const SUTRequest = {
      page: 1,
      quantity: 10
      // search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTSuccessResponse

    expect(SUTResponse.success).toBe(true)
  })

  it('should successfully validate pagination with null values', () => {
    const SUTRequest = {
      page: 1,
      quantity: 10,
      search: null
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTSuccessResponse

    expect(SUTResponse.success).toBe(true)
  })

  it("should fail validation if page isn't defined", () => {
    const SUTRequest = {
      // page: 1,
      quantity: 10,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The page number must be a number')
  })

  it("should fail validation if page isn't a number", () => {
    const SUTRequest = {
      page: NaN,
      quantity: 10,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The page number must be a number')
  })

  it("should fail validation if page isn't an integer", () => {
    const SUTRequest = {
      page: 3.1415,
      quantity: 10,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The page number must be an integer')
  })

  it("should fail validation if page isn't at least 1", () => {
    const SUTRequest = {
      page: -1,
      quantity: 10,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The page number must be at least 1')
  })

  it("should fail validation if quantity isn't defined", () => {
    const SUTRequest = {
      page: 1,
      quantity: undefined,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The quantity must be a number')
  })

  it("should fail validation if quantity isn't a number", () => {
    const SUTRequest = {
      page: 1,
      quantity: NaN,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The quantity must be a number')
  })

  it("should fail validation if quantity isn't an integer", () => {
    const SUTRequest = {
      page: 1,
      quantity: 3.1415,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The quantity must be an integer')
  })

  it("should fail validation if quantity isn't at least 1", () => {
    const SUTRequest = {
      page: 1,
      quantity: -1,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The quantity must be at least 1')
  })

  it("should fail validation if quantity isn't at most 100", () => {
    const SUTRequest = {
      page: 1,
      quantity: 256,
      search: 'test'
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The quantity must be at most 100')
  })

  it("should fail validation if search isn't a string", () => {
    const SUTRequest = {
      page: 1,
      quantity: 10,
      search: 123
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The search query must be a string')
  })

  it('should fail validation if search is an empty string', () => {
    const SUTRequest = {
      page: 1,
      quantity: 10,
      search: ''
    }

    const SUTResponse = zodPaginationSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('The search query must be at least 1 character long')
  })
})
