import { type IdValidator } from '../../../../data'
import { zodIdSchema } from '../schemas'

export class ZodIdValidator implements IdValidator {
  validate (request: IdValidator.Request): IdValidator.Response {
    const { success } = zodIdSchema.safeParse(request)

    return success
  }
}
