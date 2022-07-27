import { Controller } from '@core/application/ports/controllers/controller'
import { HttpResponse } from '@core/application/ports/responses/response-model'
import { NextFunction, Request, Response } from 'express'
import { ApiResponse } from './api-response-adapter'

export const expressRouterAdapter = <T>(controller: Controller<T>) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    return await Promise.resolve(
      controller.handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers
      })
        .then(ctrResponse => {
          const { type, message, body } = ctrResponse
          next(ApiResponse[`${type}`](message, body))
        })
        .catch((err) => {
          const r = err.message.split(',')
          const type: HttpResponse = r[0]
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          next(ApiResponse[`${type}`](r[1], {}))
        })
    )
  }
}
