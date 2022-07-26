import { ResponseHandler, ResponseModel, HttpResponse } from '@core/application/ports/responses/response-model'

export class ControllerGenericResponse<T> implements ResponseHandler<T> {
  async response (body: T, type: HttpResponse, message: string): Promise<ResponseModel<T>> {
    return {
      type,
      body,
      message
    }
  }
}
