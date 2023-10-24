import { z as zod } from 'zod'

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
export const zodCreateAddressSchema = zod.object({
  postalCode: zod.string({
    description: 'The address postal code',
    required_error: 'postalCode is required',
    invalid_type_error: 'postalCode must be a string'
  }),
  street: zod.string({
    description: 'The address street',
    required_error: 'street is required',
    invalid_type_error: 'street must be a string'
  }),
  number: zod.string({
    description: 'The address number',
    required_error: 'number is required',
    invalid_type_error: 'number must be a string'
  }),
  neighborhood: zod.string({
    description: 'The address neighborhood',
    required_error: 'neighborhood is required',
    invalid_type_error: 'neighborhood must be a string'
  }),
  complement: zod.string({
    description: 'The address complement',
    invalid_type_error: 'complement must be a string'
  })
    .nullable()
    .optional()
    .transform(complement => complement || null),
  city: zod.string({
    description: 'The address city',
    required_error: 'city is required',
    invalid_type_error: 'city must be a string'
  }),
  state: zod.string({
    description: 'The address state',
    required_error: 'state is required',
    invalid_type_error: 'state must be a string'
  })
}, {
  description: 'The address payload',
  required_error: 'payload is required',
  invalid_type_error: 'payload must be an object'
})
