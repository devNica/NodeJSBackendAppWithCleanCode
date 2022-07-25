import { SignedToken } from '@core/domain/models/token'

export interface JwtToken {
  signAccessToken: (userId: number) => SignedToken
  signRefreshToken: (userId: number) => SignedToken
  verify: (jwtToken: string, isAccessToken?: boolean) => string
}
