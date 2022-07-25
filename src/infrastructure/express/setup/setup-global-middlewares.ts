import { Application, json, urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

export const setupGlobalMiddlewares = (app: Application): void => {
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(cors({ origin: '*' }))
  app.use(json())
  app.use(urlencoded({ extended: true }))
}
