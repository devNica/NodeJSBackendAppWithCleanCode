import { isNull } from '@common/helpers/boolean-utility'
import { Controller } from '@core/application/ports/controllers/controller'
import { RequestModel } from '@core/application/ports/requests/request-model'
import { ResponseHandler, ResponseModel } from '@core/application/ports/responses/response-model'
import { AddUserInformationUseCase } from '@core/application/usecases/add-user-information'
import { AddUserInfoDTO, AddUserInfoRequest, AddUserInfoResponse } from '@core/domain/models/user'

export class AddUserInfoController implements Controller<AddUserInfoResponse | null> {
  constructor (
    private readonly addUserInfoUC: AddUserInformationUseCase,
    private readonly presenter: ResponseHandler<AddUserInfoResponse>
  ) {}

  async handleRequest (request: RequestModel<AddUserInfoRequest>): Promise<ResponseModel<AddUserInfoResponse>> | never {
    if (isNull(request) || request?.body == null) throw new Error('invalid request')
    if (request.params?.id === null) throw new Error('Params not found')
    const { firstname, lastname, address, age, birthdate, dni } = request.body
    const dto: AddUserInfoDTO = {
      firstname,
      lastname,
      address,
      age,
      birthdate,
      dni,
      fkUser: request.params.id
    }
    const data = await this.addUserInfoUC.execute(dto)
    const response = await this.presenter.response(data, 'createdRequest', 'User information successfully registered')
    return response
  }
}
