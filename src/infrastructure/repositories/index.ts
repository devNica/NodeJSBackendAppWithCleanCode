import { FindUserByEmailRepository } from '@core/application/ports/repositories/find-user-repository'
import { UserRegisterRepository } from '@core/application/ports/repositories/user-register-repository'
import { UserRepository } from './user-repositories'

const userRepository = new UserRepository()

const findUserByEmailRepository: FindUserByEmailRepository = userRepository
const userRegisterRepository: UserRegisterRepository = userRepository

export {
  findUserByEmailRepository,
  userRegisterRepository
}
