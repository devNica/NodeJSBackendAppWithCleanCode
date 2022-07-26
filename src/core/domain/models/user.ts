/** USECASE REQUEST INTERFACE DEFINITION */
export interface UserRegisterRequest {
  email: string
  password: string
}

export interface UserLoginRequest {
  email: string
  password: string
}

/** DTO INTERFACE DEFINITION */
export interface UserRegisterDTO extends UserRegisterRequest{
  createdAt: string
  fkGroup: number
}

export interface UserLoginDTO extends UserLoginRequest {}

/** USECASE RESPONSE INTERFACE DEFINITION */
export interface UserRegisterResponse {
  id: number
}

export interface UserLoginResponse {
  id: number
  email: string
  token: string
  group: string[]
}

/** USECASE INTERFACE DEFINITION */
export interface UserRegisterUC {
  execute: (request: UserRegisterRequest) => Promise<UserRegisterResponse> | never
}

export interface UserLoginUC {
  execute: (request: UserLoginRequest) => Promise<UserLoginResponse> | never
}

/** REPOSITORY RESPONSE INTERFACE DEFINITION */
export interface FetchUser {
  id: number
  email: string
  password: string
  isActive: boolean
  // group: string[]
}
