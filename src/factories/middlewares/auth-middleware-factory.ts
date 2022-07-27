import { jwtTokenSecurity } from '@common/security/token-security'
import { AuthMiddleware } from '@interface/middlewares/auth-middleware'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const AuthMiddlewareFactory = () => {
  const authMiddleware = new AuthMiddleware(jwtTokenSecurity)

  return {
    authMiddleware
  }
}
