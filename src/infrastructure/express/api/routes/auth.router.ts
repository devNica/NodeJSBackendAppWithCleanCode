/* eslint-disable @typescript-eslint/no-misused-promises */
import { authControllerFactory } from '@factories/auth/auth-controller-factory'
import { expressRouterAdapter } from '@infrastructure/express/adapters/express-route-adapter'
import { Router } from 'express'

const { userRegisterController } = authControllerFactory()

const authRouter = Router()

authRouter.post('/signup', expressRouterAdapter(userRegisterController))

export default authRouter
