import {
  describe,
  it,
  expect,
  jest
} from '@jest/globals'

import { type Controller } from '../../presentation/protocols'
import { ErrorHandlerControllerDecorator } from './ErrorHandlerControllerDecorator'

const getSUTEnvironment = () => {
  class ControllerStub implements Controller {
    async handle (_request: Controller.Request): Controller.Response {
      return await Promise.resolve(
        {
          statusCode: 200,
          body: {
            test: true
          }
        }
      )
    }
  }

  const controller = new ControllerStub()

  const logControllerDecorator = new ErrorHandlerControllerDecorator(
    controller
  )

  return {
    controller,

    SUT: logControllerDecorator
  }
}

describe('ErrorHandlerController Decorator', () => {
  it('should successfully decorate controller', async () => {
    const { SUT } = getSUTEnvironment()

    const SUTRequest = {
      body: {
        test: 'test'
      }
    }

    const expectedResponse = {
      statusCode: 200,
      body: {
        test: true
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)
    expect(SUTResponse).toEqual(expectedResponse)
  })

  it('should pass http request to controller', async () => {
    const { SUT, controller } = getSUTEnvironment()

    const handleSpy = jest.spyOn(controller, 'handle')

    const SUTRequest = {
      body: {
        test: 'test'
      }
    }

    await SUT.handle(SUTRequest)

    expect(handleSpy).toHaveBeenCalledWith(SUTRequest)
  })

  it('should return the same result as the controller', async () => {
    const { SUT, controller } = getSUTEnvironment()

    const SUTRequest = {
      body: {
        test: 'test'
      }
    }

    const controllerResponse = await controller.handle(SUTRequest)
    const SUTResponse = await SUT.handle(SUTRequest)

    expect(controllerResponse).toEqual(SUTResponse)
  })

  it('should catch controller errors', async () => {
    const { SUT, controller } = getSUTEnvironment()

    jest.spyOn(controller, 'handle').mockImplementationOnce(
      async () => {
        throw new Error('Test Error')
      }
    )

    const SUTRequest = {
      body: {
        test: 'test'
      }
    }

    const SUTResponse = await SUT.handle(SUTRequest)

    const expectedResponse = {
      statusCode: 500,
      body: {
        error: 'Internal Server Error'
      }
    }

    expect(SUTResponse).toEqual(expectedResponse)
  })
})
