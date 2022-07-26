import { CredentialSecurity } from '@common/security/credential-security'
import { UserRegisterUseCase } from '@core/application/usecases/auth/user-register'
import { UserRegisterResponse } from '@core/domain/models/user'
import { findUserByEmailRepository, userRegisterRepository } from '@infrastructure/repositories'
import { UserRegisterController } from '@interface/controllers/register-controller'
import { ControllerGenericResponse } from '@interface/responses/controller-generic-response'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const authControllerFactory = () => {
  const userRegisterUC = new UserRegisterUseCase(
    new CredentialSecurity(),
    userRegisterRepository,
    findUserByEmailRepository
  )

  const presenter = new ControllerGenericResponse<UserRegisterResponse>()
  const userRegisterController = new UserRegisterController(userRegisterUC, presenter)

  return {
    userRegisterUC,
    userRegisterController,
    presenter
  }
}
