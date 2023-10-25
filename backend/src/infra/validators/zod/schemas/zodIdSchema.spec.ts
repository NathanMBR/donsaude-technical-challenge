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
    const SUTRequest = undefined

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse

    expect(SUTResponse.success).toBe(false)
  })

  it("should fail validation if id isn't a number", () => {
    const SUTRequest = 'test'

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse

    expect(SUTResponse.success).toBe(false)
  })

  it("should fail validation if id isn't positive", () => {
    const SUTRequest = -1

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse

    expect(SUTResponse.success).toBe(false)
  })

  it("should fail validation if id isn't an integer", () => {
    const SUTRequest = 3.1415

    const SUTResponse = zodIdSchema.safeParse(SUTRequest) as SUTFailResponse

    expect(SUTResponse.success).toBe(false)
  })
})
