import { type HttpResponse } from '../models'

type ErrorMessage = string | undefined

export abstract class HttpResponseHelper {
  public static ok (body: any): HttpResponse {
    return {
      statusCode: 200,
      body
    }
  }

  public static created (body: any): HttpResponse {
    return {
      statusCode: 201,
      body
    }
  }

  public static noContent (): HttpResponse {
    return {
      statusCode: 204,
      body: undefined
    }
  }

  public static badRequest (message: ErrorMessage): HttpResponse {
    return {
      statusCode: 400,
      body: {
        error: 'Bad Request',
        message
      }
    }
  }

  public static notFound (message: ErrorMessage): HttpResponse {
    return {
      statusCode: 404,
      body: {
        error: 'Not Found',
        message
      }
    }
  }

  public static internalServerError (): HttpResponse {
    return {
      statusCode: 500,
      body: {
        error: 'Internal Server Error'
      }
    }
  }
}
