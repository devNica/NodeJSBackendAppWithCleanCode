import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import express from 'express'
import api from './api'
import constants from '@common/constants/constants'
import { setupApp } from './setup/setup-app'
import { setupRoutes } from './setup/setup-routes'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'
import { eventLogger } from '@common/logger/event-logger'
import sequelizeLoader from '@infrastructure/sequelize/orm/orm'
import sequelizeConfig from '@infrastructure/sequelize/connection'

export const app = express()

setupApp(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())

sequelizeLoader(sequelizeConfig)
  .then(_ => console.log('connection database success'))
  .catch(err => console.log('connection database failed: ', err))

app.listen(constants.SERVER_PORT, () => {
  eventLogger.getLoggerInfo(`🚀 Server is running on port: ${constants.SERVER_PORT}`)
})
