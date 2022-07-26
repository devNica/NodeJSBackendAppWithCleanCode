import { isNull, parseBoolean } from '@common/helpers/boolean-utility'
import { FindUserByEmailRepository } from '@core/application/ports/repositories/find-user-by-email-repository'
import { UserLoginRepository } from '@core/application/ports/repositories/user-login-repository'
import { UserRegisterRepository } from '@core/application/ports/repositories/user-register-repository'
import { FetchUser, FetchUserAccount, UserRegisterDTO, UserRegisterResponse } from '@core/domain/models/user'
import { fetchUserAccountQuery } from '@infrastructure/db/plain-queries'
import sequelizeConfig from '@infrastructure/sequelize/connection'
import { GroupHasUserModel, UserModel } from '@infrastructure/sequelize/models'
import { QueryTypes } from 'sequelize'

export class UserRepository implements
    FindUserByEmailRepository,
    UserRegisterRepository,
    UserLoginRepository {
  async findByEmail (email: string): Promise<FetchUser | null> {
    const user = await UserModel.findOne({ where: { email } })
    if (user === null) return null
    return { id: user.id, email: user.email, password: user.password, isActive: user.isActive }
  }

  async fetchUserAccount (email: string): Promise<FetchUserAccount | null> {
    interface fethUser {
      id: string
      email: string
      password: string
      is_active: string
      created_at: string
      role: string
    }

    const queryResponse: fethUser[] = await sequelizeConfig.query(fetchUserAccountQuery(), {
      replacements: { email },
      raw: true,
      plain: false,
      type: QueryTypes.SELECT
    })

    if (isNull(queryResponse[0])) return null

    const userAccount: FetchUserAccount = {
      id: parseInt(queryResponse[0].id),
      email: queryResponse[0].email,
      password: queryResponse[0].password,
      isActive: parseBoolean(queryResponse[0].is_active),
      createdAt: queryResponse[0].created_at,
      roles: queryResponse[0].role.split(',')
    }

    return userAccount
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
