import { FetchUser } from '@core/domain/models/user'

export interface FindUserByEmailRepository {
  findByEmail: (email: string) => Promise<FetchUser | null>
}
