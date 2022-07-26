import { FetchUser } from '@core/domain/models/user'

export interface FindUserByIDRepository {
  findById: (id: number) => Promise<FetchUser | null>
}
