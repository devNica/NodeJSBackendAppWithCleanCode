import { FindUserByEmailRepository } from '@core/application/ports/repositories/find-user-repository'
import { UserRegisterRepository } from '@core/application/ports/repositories/user-register-repository'
import { FetchUser, UserRegisterDTO, UserRegisterResponse } from '@core/domain/models/user'
import sequelizeConfig from '@infrastructure/sequelize/connection'
import { GroupHasUserModel, UserModel } from '@infrastructure/sequelize/models'

export class UserRepository implements
    FindUserByEmailRepository,
    UserRegisterRepository {
  async findUserByEmail (email: string): Promise<FetchUser | null> {
    const user = await UserModel.findOne({ where: { email } })
    if (user === null) return null
    return { id: user.id, email: user.email, password: user.password, isActive: user.isActive }
  }

  async createUser (data: UserRegisterDTO): Promise<UserRegisterResponse | null> {
    let newUser = {
      id: 0
    }
    await sequelizeConfig.transaction(async t => {
      newUser = await UserModel.create({ email: data.email, password: data.password, createdAt: data.createdAt }, { transaction: t })
      await GroupHasUserModel.create({ fkGroup: data.fkGroup, fkUser: newUser.id }, { transaction: t })
      // throw new Error('oops, it is not possible to process the data')
    })
    return { id: newUser.id }
  }
}
