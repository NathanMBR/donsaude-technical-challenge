import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'
import bcrypt from 'bcryptjs'

import { BcryptjsHashService } from './BcryptjsHashService'

jest.spyOn(bcrypt, 'genSalt').mockImplementation((async () => 'salt') as any)
jest.spyOn(bcrypt, 'hash').mockImplementation((async () => 'hash') as any)

const getSUTEnvironment = () => {
  const SUT = new BcryptjsHashService()

  return {
    SUT
  }
}

describe('BcryptjsHashService', () => {
  it('should successfully hash a plain text', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      text: 'test_text'
    }

    const SUTResponse = await SUT.hash(SUTRequest)

    const expectedResponse = 'hash'

    expect(SUTResponse).toBe(expectedResponse)
  })
})
