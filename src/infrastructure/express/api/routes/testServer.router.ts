import { Router } from 'express'

const testServerRouter = Router()

testServerRouter.get('/', (_req, res) => {
  res.json({ message: 'Welcome application server' })
})

export default testServerRouter
