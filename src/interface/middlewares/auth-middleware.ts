import { objectKeyExists } from '@common/helpers/object-utility'
import { JwtTokenSecurity } from '@common/security/token-security'
import { Middleware } from '@core/application/ports/middlewares/middleware'
import { MiddlewareRequestModel } from '@core/application/ports/requests/middleware-request-model'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly jwtSecurity: JwtTokenSecurity
  ) {}

  async handleRequest (request: MiddlewareRequestModel): Promise<void> | never {
    console.log(request)
    if (
      !objectKeyExists(request, 'headers') ||
        !objectKeyExists(request.headers, 'authorization')
    ) {
      throw new Error('unAuthorizedRequest,token not found')
    }

    const { authorization } = request.headers
    const [, token] = authorization.split(/\s+/)

    try {
      const userId = this.jwtSecurity.verify(token)
      request.headers.userId = userId
    } catch (error: any) {
      throw new Error('forbiddenRequest,invalid token')
    }
  }
}
