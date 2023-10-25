import { type IdValidator } from '../../../../data'
import { ZodValidationFailureWithoutIssueError } from '../errors'
import { zodIdSchema } from '../schemas'

export class ZodIdValidator implements IdValidator {
  validate (request: IdValidator.Request): IdValidator.Response {
    const zodValidationResponse = zodIdSchema.safeParse(request)

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
