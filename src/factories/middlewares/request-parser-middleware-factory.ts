import { SchemaModel } from '@core/application/ports/schemas/schemas.model'
import { RequestParserMiddleware } from '@interface/middlewares/request-parser-middleware'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const requestParserMiddlewareFactory = (schema: SchemaModel) => {
  return new RequestParserMiddleware(schema)
}
