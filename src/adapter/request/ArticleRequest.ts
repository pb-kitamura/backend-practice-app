import { Request } from 'express'
import { QueryParametersError } from '../../http/errors/QueryParametersError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'
import { QueryBodyError } from '../../http/errors/QueryBodyError'

export type queryParameters = {
  limit: string
  offset: string
}
export type queryBody = {
  title: string
  content: string
}
export class ArticleRequest {
  readonly query: queryParameters
  readonly body: queryBody
  constructor({ query, body }: Request) {
    this.query = {
      limit: (query.limit as string | undefined) ?? '50',
      offset: (query.offset as string | undefined) ?? '0',
    }
    this.body = body
    if (Number(this.query.limit) > 50 || Number(this.query.limit) < 0)
      throw new QueryParametersError(
        `${HTTP_ERROR_MESSAGE.QueryParametersError} limitは0以上50以下`,
      )
    if (Number(this.query.offset) < 0)
      throw new QueryParametersError(`${HTTP_ERROR_MESSAGE.QueryParametersError} offsetは0以上`)
    if (isNaN(Number(this.query.limit)))
      throw new QueryParametersError(
        `${HTTP_ERROR_MESSAGE.QueryParametersError} limitは数字である必要がある`,
      )
    if (isNaN(Number(this.query.offset)))
      throw new QueryParametersError(
        `${HTTP_ERROR_MESSAGE.QueryParametersError} limitは数字である必要がある`,
      )
    if (Object.keys(body).length !== 0) {
      if (!body.title) throw new QueryBodyError(HTTP_ERROR_MESSAGE.QueryBodyError)
    }
  }
}
