/** USECASE REQUEST INTERFACE DEFINITION */
export interface UserRegisterRequest {
  email: string
  password: string
}

export interface UserLoginRequest {
  email: string
  password: string
}

export interface AddUserInfoRequest {
  firstname: string
  lastname: string
  address: string
  age: number
  dni: string
  birthdate: string
}

/** DTO INTERFACE DEFINITION */
export interface UserRegisterDTO extends UserRegisterRequest{
  createdAt: string
  fkGroup: number
}

export interface UserLoginDTO extends UserLoginRequest {}

export interface AddUserInfoDTO extends AddUserInfoRequest {
  fKUser: number
}

/** USECASE RESPONSE INTERFACE DEFINITION */
export interface UserRegisterResponse {
  id: number
}

export interface UserLoginResponse {
  id: number
  email: string
  token: string
  isActive: boolean
  roles: string[]
  createdAt: string
}

export interface AddUserInfoResponse {
  fullname: string
}

/** USECASE INTERFACE DEFINITION */
export interface UserRegisterUC {
  execute: (request: UserRegisterRequest) => Promise<UserRegisterResponse> | never
}

export interface UserLoginUC {
  execute: (request: UserLoginRequest) => Promise<UserLoginResponse> | never
}

export interface AddUserInfoUC{
  execute: (request: AddUserInfoDTO) => Promise<AddUserInfoResponse> | never
}

/** REPOSITORY RESPONSE INTERFACE DEFINITION */
export interface FetchUser {
  id: number
  email: string
  password: string
  isActive: boolean
}

export interface FetchUserAccount extends FetchUser{
  roles: string[]
  createdAt: string
}
