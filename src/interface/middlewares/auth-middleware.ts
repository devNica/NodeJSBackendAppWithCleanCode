import { objectKeyExists } from '@common/helpers/object-utility'
import { JwtTokenSecurity } from '@common/security/token-security'
import { GenericErrorHandler } from '@core/application/ports/errors/default-application-error'
import { Middleware } from '@core/application/ports/middlewares/middleware'
import { MiddlewareRequestModel } from '@core/application/ports/requests/middleware-request-model'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly jwtSecurity: JwtTokenSecurity
  ) {}

  async handleRequest (request: MiddlewareRequestModel): Promise<void> {
    if (
      !objectKeyExists(request, 'headers') ||
        !objectKeyExists(request.headers, 'authorization')
    ) {
      throw new GenericErrorHandler('Invalid requets', 'unAuthorizedRequest')
    }

    const { authorization } = request.headers
    const [, token] = authorization.split(/\+/)

    try {
      const userId = this.jwtSecurity.verify(token)
      request.headers.userId = userId
    } catch (error: any) {
      throw new GenericErrorHandler(error.message, 'forbiddenRequest')
    }
  }
}
