/* eslint-disable @typescript-eslint/no-misused-promises */
import { authControllerFactory } from '@factories/auth/auth-controller-factory'
import { requestParserMiddlewareFactory } from '@factories/middlewares/request-parser-middleware-factory'
import { expressMiddlewareAdapter } from '@infrastructure/express/adapters/express-middleware-adapter'
import { expressRouterAdapter } from '@infrastructure/express/adapters/express-route-adapter'
import { authSchema } from '@interface/validator/auth.schema'
import { Router } from 'express'

const { userRegisterController, userLoginController } = authControllerFactory()

const authRouter = Router()

authRouter.post('/signup', expressRouterAdapter(userRegisterController))
authRouter.post('/signin',
  expressMiddlewareAdapter(requestParserMiddlewareFactory(authSchema)),
  expressRouterAdapter(userLoginController)
)

export default authRouter
