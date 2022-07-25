export interface SignedToken {
  token: string
  expirationDate: Date
}

export interface Token {
  id: number
  token: string
  user_id: number
  expires_in: string
}

export type TokenRequestModel = Omit<Token, 'id'>
