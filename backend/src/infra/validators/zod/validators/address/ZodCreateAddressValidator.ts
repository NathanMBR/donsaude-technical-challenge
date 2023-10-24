import { type CreateAddressValidator } from '../../../../../data'
import { zodCreateAddressSchema } from '../../schemas'
import { ZodValidationFailureWithoutIssueError } from '../../errors'

export class ZodCreateAddressValidator implements CreateAddressValidator {
  validate (request: CreateAddressValidator.Request): CreateAddressValidator.Response {
    const zodValidationResponse = zodCreateAddressSchema.safeParse(request)
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
