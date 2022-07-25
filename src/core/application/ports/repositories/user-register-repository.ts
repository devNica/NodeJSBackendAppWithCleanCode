import { UserRegisterDTO, UserRegisterResponse } from '@core/domain/models/user'

export interface UserRegisterRepository {
  createUser: (data: UserRegisterDTO) => Promise<UserRegisterResponse> | null
}
