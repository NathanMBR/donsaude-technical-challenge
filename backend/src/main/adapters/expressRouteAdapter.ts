import {
  type Request as ExpressRequest,
  type Response as ExpressResponse
} from 'express'

import { type Controller } from '../../presentation'

export const expressRouteAdapter = (controller: Controller) => {
  const expressRoute = async (
    request: ExpressRequest,
    response: ExpressResponse
  ): Promise<ExpressResponse> => {
    const { body, params, query } = request

    const httpResponse = await controller.handle({
      body,
      params,
      query
    })

    if (!httpResponse.body)
      return response.sendStatus(httpResponse.statusCode)

    return response
      .status(httpResponse.statusCode)
      .json(httpResponse.body)
  }

  return expressRoute
}
