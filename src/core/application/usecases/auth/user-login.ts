/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FindUserByEmailRepository } from '@core/application/ports/repositories/find-user-repository'
import { JwtToken } from '@core/application/ports/security/jwt-token'
import { UserLoginRequest, UserLoginResponse, UserLoginUC } from '@core/domain/models/user'

export class UserLoginUsecase implements UserLoginUC {
  constructor (
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly jwtToken: JwtToken
  ) {}

  async execute (request: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.findUserByEmailRepository.findUserByEmail(request.email)
    if (!user) throw new Error('User account not found')
    if (!user.isActive) throw new Error('User account is disabled')
    const generateToken = this.jwtToken.signAccessToken(user.id)
    return {
      id: user.id,
      email: user.email,
      token: generateToken.token,
      group: []
    }
  }
}
