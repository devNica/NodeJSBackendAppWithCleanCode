import { FindUserByEmailRepository } from '@core/application/ports/repositories/find-user-by-email-repository'
import { UserLoginRepository } from '@core/application/ports/repositories/user-login-repository'
import { UserRegisterRepository } from '@core/application/ports/repositories/user-register-repository'
import { UserRepository } from './user-repositories'

const userRepository = new UserRepository()

const findUserByEmailRepository: FindUserByEmailRepository = userRepository
const userRegisterRepository: UserRegisterRepository = userRepository
const userLoginRepository: UserLoginRepository = userRepository

export {
  findUserByEmailRepository,
  userRegisterRepository,
  userLoginRepository
}
