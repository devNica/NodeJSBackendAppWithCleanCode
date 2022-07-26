export type HttpResponse = 'successRequest' | 'internalServerErrorRequets'

export interface ResponseModel<T> {
  type: HttpResponse
  message: string
  body: T
}

export interface ResponseHandler<T = any> {
  response: (body: T) => Promise<ResponseModel<T>>
}
