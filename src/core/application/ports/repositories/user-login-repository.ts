import { FetchUserAccount } from '@core/domain/models/user'

export interface UserLoginRepository {
  fetchUserAccount: (email: string) => Promise<FetchUserAccount | null>
}
