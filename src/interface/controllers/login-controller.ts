import { isNull } from '@common/helpers/boolean-utility'
import { Controller } from '@core/application/ports/controllers/controller'
import { GenericErrorHandler } from '@core/application/ports/errors/default-application-error'
import { RequestModel } from '@core/application/ports/requests/request-model'
import { ResponseHandler, ResponseModel } from '@core/application/ports/responses/response-model'
import { UserLoginUsecase } from '@core/application/usecases/auth/user-login'
import { UserLoginRequest, UserLoginResponse } from '@core/domain/models/user'

export class LoginController implements Controller<UserLoginResponse | never> {
  constructor (
    private readonly userLoginUC: UserLoginUsecase,
    private readonly presenter: ResponseHandler<UserLoginResponse>
  ) {}

  async handleRequest (request: RequestModel<UserLoginRequest>): Promise<ResponseModel<UserLoginResponse>> | never {
    if (isNull(request) || ((request?.body) == null)) throw new GenericErrorHandler('Invalid request', 'badRequest')
    const { email, password } = request.body
    const data = await this.userLoginUC.execute({ email, password })
    const response = await this.presenter.response(data, 'successRequest', 'session started successfully')
    return response
  }
}
