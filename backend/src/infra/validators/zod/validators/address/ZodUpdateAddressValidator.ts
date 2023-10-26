import { type UpdateAddressValidator } from '../../../../../data'
import { zodUpdateAddressSchema } from '../../schemas'
import { ZodValidationFailureWithoutIssueError } from '../../errors'

export class ZodUpdateAddressValidator implements UpdateAddressValidator {
  validate (request: UpdateAddressValidator.Request): UpdateAddressValidator.Response {
    const zodValidationResponse = zodUpdateAddressSchema.safeParse(request)
    if (!zodValidationResponse.success) {
      const [issue] = zodValidationResponse.error.issues
      if (!issue)
        throw new ZodValidationFailureWithoutIssueError()

      return {
        success: false,
        errorMessage: issue.message
      }
    }

    return {
      success: true,
      data: zodValidationResponse.data
    }
  }
}
