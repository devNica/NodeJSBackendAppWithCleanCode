import { AddUserInfoRepository } from '@core/application/ports/repositories/add-userinfo-repository'
import { FindUserByEmailRepository } from '@core/application/ports/repositories/find-user-by-email-repository'
import { FindUserByIDRepository } from '@core/application/ports/repositories/find-user-byId-respository'
import { UserLoginRepository } from '@core/application/ports/repositories/user-login-repository'
import { UserRegisterRepository } from '@core/application/ports/repositories/user-register-repository'
import { UserRepository } from './user-repositories'

const userRepository = new UserRepository()

const findUserByEmailRepository: FindUserByEmailRepository = userRepository
const findUserByIdRepository: FindUserByIDRepository = userRepository
const addUserInfoRepository: AddUserInfoRepository = userRepository
const userRegisterRepository: UserRegisterRepository = userRepository
const userLoginRepository: UserLoginRepository = userRepository

export {
  findUserByEmailRepository,
  findUserByIdRepository,
  addUserInfoRepository,
  userRegisterRepository,
  userLoginRepository
}
