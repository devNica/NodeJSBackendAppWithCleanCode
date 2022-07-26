import { AddUserInfoDTO, AddUserInfoResponse } from '@core/domain/models/user'

export interface AddUserInfoRepository {
  addUserInfo: (data: AddUserInfoDTO) => Promise<AddUserInfoResponse | null>
}
