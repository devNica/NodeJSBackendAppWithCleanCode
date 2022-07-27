/* eslint-disable @typescript-eslint/no-misused-promises */
import { userControllerFactory } from '@factories/auth/user-controller-factory'
import { AuthMiddlewareFactory } from '@factories/middlewares/auth-middleware-factory'
import { expressMiddlewareAdapter } from '@infrastructure/express/adapters/express-middleware-adapter'
import { expressRouterAdapter } from '@infrastructure/express/adapters/express-route-adapter'
import { Router } from 'express'

const { addUserInfoController } = userControllerFactory()
const { authMiddleware } = AuthMiddlewareFactory()

const userRouter = Router()

userRouter.post('/:id/add-info',
  expressMiddlewareAdapter(authMiddleware),
  expressRouterAdapter(addUserInfoController)
)

export default userRouter
