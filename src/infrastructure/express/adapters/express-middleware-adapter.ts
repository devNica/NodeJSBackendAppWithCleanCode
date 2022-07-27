import { Middleware } from '@core/application/ports/middlewares/middleware'
import { Request, Response, NextFunction } from 'express'

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
        return next()
      })
      .catch(error => {
        return next(error)
      })
  }
}
