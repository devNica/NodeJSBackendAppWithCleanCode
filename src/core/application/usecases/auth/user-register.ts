import constants from '@common/constants/constants'
import { getCurrentTimeFormatted } from '@common/helpers/date-utility'
import { FindUserByEmailRepository } from '@core/application/ports/repositories/find-user-repository'
import { UserRegisterRepository } from '@core/application/ports/repositories/user-register-repository'
import { UserRegisterRequest, UserRegisterResponse, UserRegisterUC } from '@core/domain/models/user'

export class UserRegisterUseCase implements UserRegisterUC {
  constructor (
    private readonly userRegisterRepository: UserRegisterRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository
  ) {}

  async execute (request: UserRegisterRequest): Promise<UserRegisterResponse> | never {
    const dto = {
      ...request,
      createdAt: getCurrentTimeFormatted(),
      fkGroup: constants.ROL.COMMON_USERS
    }

    const already = await this.findUserByEmailRepository.findUserByEmail(request.email)

    if (already !== null) throw new Error('Email already register')

    const newUser = await this.userRegisterRepository.createUser(dto)

    if (newUser === null) throw new Error('Oops, an error has ocurred')
    return { id: newUser.id }
  };
}
