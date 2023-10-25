import {
  describe,
  it,
  expect
} from '@jest/globals'

import { getRepositoryPaginationRequest } from './getRepositoryPaginationRequest'

describe('getRepositoryPaginationRequest', () => {
  it('should successfully calculate the pagination parameters', () => {
    const SUTRequest = {
      quantity: 10,
      page: 3
    }

    const SUTResponse = getRepositoryPaginationRequest(SUTRequest)

    const expectedResponse = {
      take: 10,
      skip: 20
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
