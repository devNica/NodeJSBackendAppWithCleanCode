import { Application } from 'express'
import { ApiResponse, httpResponseHandler } from '../adapters/api-response-adapter'
import { APIType } from '../api'

export const setupRoutes = (app: Application, routes: APIType[]): void => {
  routes.forEach(route => {
    app.use(route.path, route.controller)
  })

  app.use((_req, _res, next) => {
    const error = new Error('Internal Server error')
    next(ApiResponse.internalServerErrorRequets(error.message, {}))
  })

  app.use(httpResponseHandler)
}
