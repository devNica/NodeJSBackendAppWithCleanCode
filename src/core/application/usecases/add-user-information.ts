import { AddUserInfoDTO, AddUserInfoResponse, AddUserInfoUC } from '@core/domain/models/user'
import { GenericErrorHandler } from '../ports/errors/default-application-error'
import { AddUserInfoRepository } from '../ports/repositories/add-userinfo-repository'
import { FindUserByIDRepository } from '../ports/repositories/find-user-byId-respository'

export class AddUserInformationUseCase implements AddUserInfoUC {
  constructor (
    private readonly findUserByIdRepository: FindUserByIDRepository,
    private readonly addUserInfoRepository: AddUserInfoRepository
  ) {}

  async execute (request: AddUserInfoDTO): Promise<AddUserInfoResponse> | never {
    const check = await this.findUserByIdRepository.findById(request.fkUser)
    if (check === null) throw new GenericErrorHandler('user account not found', 'unProcessableEntityRequest')
    const response = await this.addUserInfoRepository.addUserInfo(request)
    if (response === null) throw new GenericErrorHandler('oops, the process did not complete correctly', 'internalServerErrorRequets')
    return {
      fullname: response.fullname
    }
  }
}
