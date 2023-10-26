import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import { ZodError } from 'zod'

import { ZodUpdatePartnerValidator } from './ZodUpdatePartnerValidator'
import { zodUpdatePartnerSchema } from '../../schemas'
import { ZodValidationFailureWithoutIssueError } from '../../errors'

const getSUTEnvironment = () => {
  const SUT = new ZodUpdatePartnerValidator()

  return {
    SUT
  }
}

describe('ZodUpdatePartnerValidator', () => {
  it('should successfully validate a update partner payload', () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      name: 'test_name',
      category: 'test_category',
      cnpj: 'test_cnpj',
      phone: 'test_phone',
      cellphone: 'test_cellphone',
      clinicalManagerName: 'test_clinical_manager_name',
      financialManagerName: 'test_financial_manager_name',
      addressId: 1
    }

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      success: true,
      data: SUTRequest
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should return error if validation fails', () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(zodUpdatePartnerSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new ZodError([
        {
          code: 'custom',
          path: ['test'],
          message: 'Test error'
        }
      ])
    })

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

    const SUTResponse = SUT.validate(SUTRequest)

    const expectedResponse = {
      success: false,
      errorMessage: 'Test error'
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should throw error if validations fails without issue', () => {
    const { SUT } = getSUTEnvironment()

    jest.spyOn(zodUpdatePartnerSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new ZodError([])
    })

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

    const getSUTResponse = () => SUT.validate(SUTRequest)

    const error = new ZodValidationFailureWithoutIssueError()

    expect(getSUTResponse).toThrowError(error)
  })

  it('should not call unsafe zod method', () => {
    const { SUT } = getSUTEnvironment()

    const parseSpy = jest.spyOn(zodUpdatePartnerSchema, 'parse')

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

    SUT.validate(SUTRequest)

    expect(parseSpy).not.toHaveBeenCalled()
  })
})
