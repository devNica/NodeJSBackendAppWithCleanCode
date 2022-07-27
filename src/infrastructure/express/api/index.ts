import constants from '@common/constants/constants'
import { Router } from 'express'
import authRouter from './routes/auth.router'
import testServerRouter from './routes/testServer.router'
import userRouter from './routes/user.router'

export interface APIType {
  path: string
  controller: Router
}

export default function api (): APIType[] {
  return [
    { path: `${constants.PREFIX}/test`, controller: testServerRouter },
    { path: `${constants.PREFIX}/auth`, controller: authRouter },
    { path: `${constants.PREFIX}/users`, controller: userRouter }
  ]
}
