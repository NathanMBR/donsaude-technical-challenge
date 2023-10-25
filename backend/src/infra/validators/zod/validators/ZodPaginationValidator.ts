import { type PaginationValidator } from '../../../../data'
import { zodPaginationSchema } from '../schemas'

export class ZodPaginationValidator implements PaginationValidator {
  validate (request: PaginationValidator.Request): PaginationValidator.Response {
    const defaultPagination = {
      page: 1,
      quantity: 10,
      search: undefined
    }

    const zodValidationResponse = zodPaginationSchema.safeParse(request)

    if (!zodValidationResponse.success)
      return defaultPagination

    return zodValidationResponse.data
  }
}
