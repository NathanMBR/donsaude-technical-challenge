import { z as zod } from 'zod'

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
export const zodPaginationSchema = zod.object({
  page: zod.coerce.number({
    description: 'The page number',
    required_error: 'The page number is required',
    invalid_type_error: 'The page number must be a number'
  })
    .int('The page number must be an integer')
    .positive('The page number must be a positive number'),

  quantity: zod.coerce.number({
    description: 'The quantity of items per page',
    required_error: 'The quantity is required',
    invalid_type_error: 'The quantity must be a number'
  })
    .int('The quantity must be an integer')
    .positive('The quantity must be a positive number'),

  search: zod.string({
    description: 'The search query',
    invalid_type_error: 'The search query must be a string'
  })
    .min(1, 'The search query must be at least 1 character long')
    .optional()
    .nullable()
    .transform(value => value?.trim() || undefined)

}, {
  description: 'The pagination payload',
  required_error: 'The pagination payload is required',
  invalid_type_error: 'The pagination payload must be an object'
})
