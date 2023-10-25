import { z as zod } from 'zod'

export const zodIdSchema = zod.coerce.number()
  .positive()
  .int()
