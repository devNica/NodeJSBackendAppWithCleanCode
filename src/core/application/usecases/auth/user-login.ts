/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserLoginRepository } from '@core/application/ports/repositories/user-login-repository'
import { JwtToken } from '@core/application/ports/security/jwt-token'
import { UserLoginRequest, UserLoginResponse, UserLoginUC } from '@core/domain/models/user'

export class UserLoginUsecase implements UserLoginUC {
  constructor (
    private readonly userLoginRepository: UserLoginRepository,
    private readonly jwtToken: JwtToken
  ) {}

  async execute (request: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.userLoginRepository.fetchUserAccount(request.email)
    if (!user) throw new Error('User account not found')
    if (!user.isActive) throw new Error('User account is disabled')
    const generateToken = this.jwtToken.signAccessToken(user.id)
    return {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      token: generateToken.token,
      roles: user.roles,
      createdAt: user.createdAt
    }
  }
}
