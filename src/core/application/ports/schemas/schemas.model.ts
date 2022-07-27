import Joi from 'joi'
import { RequestModel } from '../requests/request-model'

export type SchemaModel = Joi.ObjectSchema

export interface SchemaHandler {
  validate: (schema: SchemaModel, requets: RequestModel) => Promise<Joi.ValidationResult>
}
