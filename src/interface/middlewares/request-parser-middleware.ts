/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Middleware } from '@core/application/ports/middlewares/middleware'
import { MiddlewareRequestModel } from '@core/application/ports/requests/middleware-request-model'
import { RequestModel } from '@core/application/ports/requests/request-model'
import { SchemaHandler, SchemaModel } from '@core/application/ports/schemas/schemas.model'
import { ObjectSchema, ValidationResult } from 'joi'

export class RequestParserMiddleware implements Middleware, SchemaHandler {
  constructor (
    private readonly _schema: SchemaModel
  ) {}

  async handleRequest (requestModel: MiddlewareRequestModel): Promise<void> {
    try {
      await this.validate(this._schema, requestModel)
    } catch (err: any) {
      const { message } = err.details[0]
      //   console.log('context: ', context, '\n')
      //   console.log('message: ', message, '\n')
      //   console.log('path: ', path, '\n')
      //   console.log('type: ', type, '\n')
      throw new Error(`badRequest,${message}`)
    }
  }

  async validate (schema: ObjectSchema<any>, request: RequestModel): Promise<ValidationResult<any>> {
    return await schema.validateAsync(request.body, { abortEarly: false, allowUnknown: true })
  }
}
