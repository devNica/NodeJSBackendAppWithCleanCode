import { FetchUser } from '@core/domain/models/user'

export interface FindUserByEmailRepository {
  findUserByEmail: (email: string) => Promise<FetchUser | null>
}
