import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import express from 'express'
import api from './api'
import constants from '@common/constants/constants'
import { setupApp } from './setup/setup-app'
import { setupRoutes } from './setup/setup-routes'
import { setupGlobalMiddlewares } from './setup/setup-global-middlewares'

export const app = express()

setupApp(app)
setupGlobalMiddlewares(app)
setupRoutes(app, api())

app.listen(constants.SERVER_PORT, () => {
  console.log(`Server is running on port: ${constants.SERVER_PORT}`)
})
