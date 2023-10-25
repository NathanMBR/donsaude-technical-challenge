import { z as zod } from 'zod'

export const zodIdSchema = zod.coerce.number({
  description: 'Entity ID',
  invalid_type_error: 'ID must be a number'
})
  .positive('ID must be a positive number')
  .int('ID must be an integer')
