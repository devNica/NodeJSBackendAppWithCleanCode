import { CredentialSecurity } from '@common/security/credential-security'
import { jwtTokenSecurity } from '@common/security/token-security'
import { UserLoginUsecase } from '@core/application/usecases/auth/user-login'
import { UserRegisterUseCase } from '@core/application/usecases/auth/user-register'
import { UserLoginResponse, UserRegisterResponse } from '@core/domain/models/user'
import { findUserByEmailRepository, userRegisterRepository } from '@infrastructure/repositories'
import { LoginController } from '@interface/controllers/login-controller'
import { UserRegisterController } from '@interface/controllers/register-controller'
import { ControllerGenericResponse } from '@interface/responses/controller-generic-response'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const authControllerFactory = () => {
  const userRegisterUC = new UserRegisterUseCase(
    new CredentialSecurity(),
    userRegisterRepository,
    findUserByEmailRepository
  )

  const userLoginUC = new UserLoginUsecase(
    findUserByEmailRepository,
    jwtTokenSecurity
  )

  const registerPresenter = new ControllerGenericResponse<UserRegisterResponse>()
  const loginPresenter = new ControllerGenericResponse<UserLoginResponse>()
  const userRegisterController = new UserRegisterController(userRegisterUC, registerPresenter)
  const userLoginController = new LoginController(userLoginUC, loginPresenter)

  return {
    userRegisterUC,
    userLoginUC,
    userRegisterController,
    userLoginController,
    registerPresenter,
    loginPresenter
  }
}
