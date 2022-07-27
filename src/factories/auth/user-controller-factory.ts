/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AddUserInformationUseCase } from '@core/application/usecases/add-user-information'
import { AddUserInfoResponse } from '@core/domain/models/user'
import { addUserInfoRepository, findUserByIdRepository } from '@infrastructure/repositories'
import { AddUserInfoController } from '@interface/controllers/add-userinfo-controller'
import { ControllerGenericResponse } from '@interface/responses/controller-generic-response'

export const userControllerFactory = () => {
  const addUserInfoUC = new AddUserInformationUseCase(
    findUserByIdRepository,
    addUserInfoRepository
  )

  const addInformationPresenter = new ControllerGenericResponse<AddUserInfoResponse>()

  const addUserInfoController = new AddUserInfoController(
    addUserInfoUC,
    addInformationPresenter
  )

  return {
    addUserInfoUC,
    addInformationPresenter,
    addUserInfoController
  }
}
