import { type CreatePartnerValidator } from '../../../../../data'
import { zodCreatePartnerSchema } from '../../schemas'
import { ZodValidationFailureWithoutIssueError } from '../../errors'

export class ZodCreatePartnerValidator implements CreatePartnerValidator {
  validate (request: CreatePartnerValidator.Request): CreatePartnerValidator.Response {
    const zodValidationResponse = zodCreatePartnerSchema.safeParse(request)
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
