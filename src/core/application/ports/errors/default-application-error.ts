import { ResponseModel } from '../responses/response-model'

export interface ErrorParams {
  statusCode: number
  statusApi: boolean
  messsage: string
}

export type ErrorResponseModel = Omit<ResponseModel<ErrorParams>, 'body'>

export class DefaultAplicationError extends Error implements ErrorResponseModel {
  public statusCode = 500
  readonly statusApi = false
  public message: string

  constructor (message: string) {
    super(message)
    this.message = message
  }
}
