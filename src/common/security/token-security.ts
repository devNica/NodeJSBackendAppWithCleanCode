import constants from '@common/constants/constants'
import { createFutureDate } from '@common/helpers/date-utility'
import { JwtToken } from '@core/application/ports/security/jwt-token'
import { SignedToken } from '@core/domain/models/token'
import jwt from 'jsonwebtoken'

export class JwtTokenSecurity implements JwtToken {
  constructor (
    private readonly secret: string,
    private readonly refreshSecret: string,
    private readonly accessTokenExpirationInSeconds: number,
    private readonly refreshTokenExpirationInSeconds: number
  ) {}

  signAccessToken (userId: number): SignedToken {
    const expirationDate = createFutureDate(
      new Date(),
      this.accessTokenExpirationInSeconds
    )
    const token = jwt.sign({ id: userId }, this.secret, {
      expiresIn: this.accessTokenExpirationInSeconds
    })

    return { token, expirationDate }
  }

  signRefreshToken (userId: number): SignedToken {
    const expirationDate = createFutureDate(
      new Date(),
      this.refreshTokenExpirationInSeconds
    )

    const token = jwt.sign({ id: userId }, this.refreshSecret, {
      expiresIn: this.refreshTokenExpirationInSeconds
    })

    return { token, expirationDate }
  }

  verify (token: string, isAccessToken = true): string {
    const secret = isAccessToken ? this.secret : this.refreshSecret
    const userData = jwt.verify(token, secret) as { id: string }
    return userData.id
  }
}

const secret = constants.JWT_SECRET
const refreshSecret = constants.JWT_SECRET_REFRESH
const secrecretExpiration = parseInt(constants.JWT_SECRET_EXPIRATION_SEC)
const secretRefreshExpiration = parseInt(constants.JWT_SECRET_REFRESH_EXPIRATION_SEC)

export const jwtTokenSecurity = new JwtTokenSecurity(
  secret,
  refreshSecret,
  secrecretExpiration,
  secretRefreshExpiration
)
