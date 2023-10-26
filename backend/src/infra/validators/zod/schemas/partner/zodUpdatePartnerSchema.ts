import { z as zod } from 'zod'

export const zodUpdatePartnerSchema = zod.object({
  name: zod.string({
    description: 'The partner name',
    required_error: 'name is required',
    invalid_type_error: 'name must be a string'
  }),
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
  description: 'The update partner payload',
  required_error: 'payload is required',
  invalid_type_error: 'payload must be an object'
})
