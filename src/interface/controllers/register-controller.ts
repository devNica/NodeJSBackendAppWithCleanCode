import { Controller } from '@core/application/ports/controllers/controller'
import { RequestModel } from '@core/application/ports/requests/request-model'
import { ResponseHandler, ResponseModel } from '@core/application/ports/responses/response-model'
import { UserRegisterRequest, UserRegisterResponse, UserRegisterUC } from '@core/domain/models/user'
import { GenericErrorHandler } from '@core/application/ports/errors/default-application-error'

export class UserRegisterController implements Controller<UserRegisterResponse | never> {
  constructor (
    private readonly userRegisterUC: UserRegisterUC,
    private readonly presenter: ResponseHandler<UserRegisterResponse>
  ) {}

  async handleRequest (request: RequestModel<UserRegisterRequest>): Promise<ResponseModel<UserRegisterResponse>> | never {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!request || request.body == null) {
      throw new GenericErrorHandler('Invalid Request', 'badRequest')
    }

    const { email, password } = request.body
    const newUser = await this.userRegisterUC.execute({ email, password })
    const response = await this.presenter.response(newUser, 'createdRequest', 'User has been created successfull')
    return response
  }
}
