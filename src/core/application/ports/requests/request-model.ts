export interface RequestModel<Body = any, Params = any, Query = any, Headers = any> {
  body?: Body
  params?: Params
  query?: Query
  headers?: Headers
}
