/* eslint-disable @typescript-eslint/no-misused-promises */
import { userControllerFactory } from '@factories/auth/user-controller-factory'
import { expressRouterAdapter } from '@infrastructure/express/adapters/express-route-adapter'
import { Router } from 'express'

const { addUserInfoController } = userControllerFactory()

const userRouter = Router()

userRouter.post('/:id/add-info', expressRouterAdapter(addUserInfoController))

export default userRouter
