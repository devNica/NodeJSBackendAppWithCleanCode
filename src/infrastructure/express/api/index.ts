import constants from '@common/constants/constants'
import { Router } from 'express'
import testServerRouter from './routes/testServer.router'

export interface APIType {
  path: string
  controller: Router
}

export default function api (): APIType[] {
  return [
    { path: `${constants.PREFIX}/test`, controller: testServerRouter }
  ]
}
