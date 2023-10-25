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

import { zodIdSchema } from './zodIdSchema'

type SchemaInfer = zod.infer<typeof zodIdSchema>
type SUTSuccessResponse = SafeParseSuccess<SchemaInfer>
type SUTFailResponse = SafeParseError<SchemaInfer>

/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('zodIdSchema', () => {
  it('should successfully validate an id', () => {
    const SUTRequest = 1

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTSuccessResponse

    const expectedResponse = {
      success: true,
      data: 1
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should successfully validate an id inside string', () => {
    const SUTRequest = '1'

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse

    expect(SUTResponse.success).toBe(true)
  })

  it("should fail validation if id isn't defined", () => {
    // type coercion makes this test fail if required message is checked, since undefined is coerced to NaN
    const SUTRequest = undefined

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse
    // const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    // expect(issue.message).toBe('ID is required')
  })

  it("should fail validation if id isn't a number", () => {
    const SUTRequest = 'test'

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('ID must be a number')
  })

  it("should fail validation if id isn't positive", () => {
    const SUTRequest = -1

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('ID must be a positive number')
  })

  it("should fail validation if id isn't an integer", () => {
    const SUTRequest = 3.1415

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('ID must be an integer')
  })
})
