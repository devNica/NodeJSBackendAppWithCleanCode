/* eslint-disable @typescript-eslint/no-misused-promises */
import { authControllerFactory } from '@factories/auth/auth-controller-factory'
import { expressRouterAdapter } from '@infrastructure/express/adapters/express-route-adapter'
import { Router } from 'express'

const { userRegisterController, userLoginController } = authControllerFactory()

const authRouter = Router()

authRouter.post('/signup', expressRouterAdapter(userRegisterController))
authRouter.post('/signin', expressRouterAdapter(userLoginController))

export default authRouter
