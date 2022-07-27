import { Middleware } from '@core/application/ports/middlewares/middleware'
import { HttpResponse } from '@core/application/ports/responses/response-model'
import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from './api-response-adapter'

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    return await Promise.resolve(
      middleware.handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
        method: request.method
      })
    )
      .then(() => {
        next()
      })
      .catch(error => {
        const r = error.message.split(',')
        const type: HttpResponse = r[0]
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        next(ApiResponse[`${type}`](r[1], {}))
        // next(error)
      })
  }
}
