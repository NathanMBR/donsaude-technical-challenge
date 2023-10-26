import { type UpdatePartnerValidator } from '../../../../../data'
import { zodUpdatePartnerSchema } from '../../schemas'
import { ZodValidationFailureWithoutIssueError } from '../../errors'

export class ZodUpdatePartnerValidator implements UpdatePartnerValidator {
  validate (request: UpdatePartnerValidator.Request): UpdatePartnerValidator.Response {
    const zodValidationResponse = zodUpdatePartnerSchema.safeParse(request)
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
