import { z as zod } from "zod"

export const zodCreatePartnerSchema = zod.object({
  name: zod.string({
    description: 'The partner name',
    required_error: 'O nome é obrigatório',
    invalid_type_error: 'O nome deve ser texto'
  })
    .refine(str => str.length > 0, { message: 'O nome é obrigatório' }),
  email: zod.string({
    description: 'The partner email',
    required_error: 'O e-mail é obrigatório',
    invalid_type_error: 'O e-mail deve ser texto'
  })
    .email('O e-mail deve estar em um formato válido')
    .refine(str => str.length > 0, { message: 'O e-mail é obrigatório' }),
  password: zod.string({
    description: 'The partner password',
    required_error: 'A senha é obrigatória',
    invalid_type_error: 'A senha deve ser texto'
  })
    .min(8, 'A senha deve ter no mínimo 8 letras'),
  category: zod.string({
    description: 'The partner category',
    required_error: 'A categoria é obrigatória',
    invalid_type_error: 'A categoria deve ser texto'
  })
    .refine(str => str.length > 0, { message: 'A categoria é obrigatória' }),
  cnpj: zod.string({
    description: 'The partner CNPJ',
    required_error: 'O CNPJ é obrigatório',
    invalid_type_error: 'O CNPJ deve ser texto'
  })
    .refine(str => str.length > 0, { message: 'O CNPJ é obrigatório' }),
  phone: zod.string({
    description: 'The partner phone',
    required_error: 'O telefone é obrigatório',
    invalid_type_error: 'O telefone deve ser texto'
  })
    .refine(str => str.length > 0, { message: 'O telefone é obrigatório' }),
  cellphone: zod.string({
    description: 'The partner cellphone',
    required_error: 'O celular é obrigatório',
    invalid_type_error: 'O celular deve ser texto'
  })
    .refine(str => str.length > 0, { message: 'O celular é obrigatório' }),
  clinicalManagerName: zod.string({
    description: 'The partner clinical manager name',
    required_error: 'O responsável clínico é obrigatório',
    invalid_type_error: 'O responsável clínico deve ser texto'
  })
    .refine(str => str.length > 0, { message: 'O responsável clínico é obrigatório' }),
  financialManagerName: zod.string({
    description: 'The partner financial manager name',
    required_error: 'O responsável financeiro é obrigatório',
    invalid_type_error: 'O responsável financeiro deve ser texto'
  })
    .refine(str => str.length > 0, { message: 'O responsável financeiro é obrigatório' })
}, {
  description: 'The create partner payload',
  required_error: 'payload is required',
  invalid_type_error: 'payload must be an object'
})
