import {
  describe,
  it,
  expect
} from '@jest/globals'
import {
  type SafeParseSuccess,
  type SafeParseError,
  type z as zod
} from 'zod'

import { zodCreatePartnerSchema } from './zodCreatePartnerSchema'

type SchemaInfer = zod.infer<typeof zodCreatePartnerSchema>
type SUTSuccessResponse = SafeParseSuccess<SchemaInfer>
type SUTFailResponse = SafeParseError<SchemaInfer>

/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('zodCreatePartnerSchema', () => {
  it('should successfully validate a create partner payload', () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTSuccessResponse

    expect(SUTResponse.success).toBe(true)
    expect(SUTResponse.data).toEqual(SUTRequest)
  })

  it("should fail validation if name isn't defined", () => {
    const SUTRequest = {
      // name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('name is required')
  })

  it("should fail validation if name isn't a string", () => {
    const SUTRequest = {
      name: 1,
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('name must be a string')
  })

  it("should fail validation if email isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      // email: '',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('email is required')
  })

  it("should fail validation if email isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 1,
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('email must be a string')
  })

  it("should fail validation if email isn't a valid email address", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'invalid_email',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('email must be in a valid format')
  })

  it("should fail validation if password isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      // password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('password is required')
  })

  it("should fail validation if password isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 123,
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('password must be a string')
  })

  it("should fail validation if password isn't at least 8 characters long", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: '1234',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('password must have at least 8 characters')
  })

  it("should fail validation if category isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      // category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('category is required')
  })

  it("should fail validation if category isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 123,
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('category must be a string')
  })

  it("should fail validation if cnpj isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      // cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('cnpj is required')
  })

  it("should fail validation if cnpj isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 12345,
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('cnpj must be a string')
  })

  it("should fail validation if phone isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      // phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('phone is required')
  })

  it("should fail validation if phone isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 12345,
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('phone must be a string')
  })

  it("should fail validation if cellphone isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      // cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('cellphone is required')
  })

  it("should fail validation if cellphone isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 12345,
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('cellphone must be a string')
  })

  it("should fail validation if clinicalManagerName isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      // clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('clinicalManagerName is required')
  })

  it("should fail validation if clinicalManagerName isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 12345,
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('clinicalManagerName must be a string')
  })

  it("should fail validation if financialManagerName isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      // financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('financialManagerName is required')
  })

  it("should fail validation if financialManagerName isn't a string", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 12345,
      addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('financialManagerName must be a string')
  })

  it("should fail validation if addressId isn't defined", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name'
      // addressId: 1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('addressId is required')
  })

  it("should fail validation if addressId isn't a number", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: NaN
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('addressId must be a number')
  })

  it("should fail validation if addressId isn't an integer", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 3.1415
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('addressId must be an integer')
  })

  it("should fail validation if addressId isn't at least 1", () => {
    const SUTRequest = {
      name: 'test_name',
      email: 'test@email.com',
      password: 'test_password',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: -1
    }

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('addressId must be greater than or equal to 1')
  })

  it("should fail validation if payload isn't defined", () => {
    const SUTRequest = undefined

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('payload is required')
  })

  it("should fail validation if payload isn't an object", () => {
    const SUTRequest = 'test_payload'

    const SUTResponse = zodCreatePartnerSchema.safeParse(SUTRequest) as SUTFailResponse
    const issue = SUTResponse.error.issues[0]!

    expect(SUTResponse.success).toBe(false)
    expect(issue.message).toBe('payload must be an object')
  })
})
