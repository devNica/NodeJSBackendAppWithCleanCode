export interface UserRegisterRequest {
  email: string
  password: string
}

export interface UserRegisterDTO extends UserRegisterRequest{
  createdAt: string
  fkGroup: number
}

export interface UserRegisterResponse {
  id: number
}

export interface UserRegisterUC {
  execute: (request: UserRegisterRequest) => Promise<UserRegisterResponse> | never
}

export interface FetchUser {
  id: number
  email: string
  password: string
  isActive: boolean
  // group: string[]
}
