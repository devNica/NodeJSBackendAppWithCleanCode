import { Application } from 'express'
import { APIType } from '../api'

export const setupRoutes = (app: Application, routes: APIType[]): void => {
  routes.forEach(route => {
    app.use(route.path, route.controller)
  })
}
