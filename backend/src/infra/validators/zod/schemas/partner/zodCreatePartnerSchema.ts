import { z as zod } from 'zod'

export const zodCreatePartnerSchema = zod.object({
  name: zod.string({
    description: 'The partner name',
    required_error: 'name is required',
    invalid_type_error: 'name must be a string'
  }),
  email: zod.string({
    description: 'The partner email',
    required_error: 'email is required',
    invalid_type_error: 'email must be a string'
  })
    .email('email must be in a valid format'),
  password: zod.string({
    description: 'The partner password',
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  })
    .min(8, 'password must have at least 8 characters'),
  category: zod.string({
    description: 'The partner category',
    required_error: 'category is required',
    invalid_type_error: 'category must be a string'
  }),
  cnpj: zod.string({
    description: 'The partner CNPJ',
    required_error: 'cnpj is required',
    invalid_type_error: 'cnpj must be a string'
  }),
  phone: zod.string({
    description: 'The partner phone',
    required_error: 'phone is required',
    invalid_type_error: 'phone must be a string'
  }),
  cellphone: zod.string({
    description: 'The partner cellphone',
    required_error: 'cellphone is required',
    invalid_type_error: 'cellphone must be a string'
  }),
  clinicalManagerName: zod.string({
    description: 'The partner clinical manager name',
    required_error: 'clinicalManagerName is required',
    invalid_type_error: 'clinicalManagerName must be a string'
  }),
  financialManagerName: zod.string({
    description: 'The partner financial manager name',
    required_error: 'financialManagerName is required',
    invalid_type_error: 'financialManagerName must be a string'
  }),
  addressId: zod.number({
    description: 'The partner address id',
    required_error: 'addressId is required',
    invalid_type_error: 'addressId must be a number'
  })
    .int('addressId must be an integer')
    .min(1, 'addressId must be greater than or equal to 1')
}, {
  description: 'The create partner payload',
  required_error: 'payload is required',
  invalid_type_error: 'payload must be an object'
})
