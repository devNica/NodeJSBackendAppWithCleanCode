import { FetchUser } from '@core/domain/models/user'

export interface FindUserRepository {
  findUserByEmail: (email: string) => Promise<FetchUser>| null
}
