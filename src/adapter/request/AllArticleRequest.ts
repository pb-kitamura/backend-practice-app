import { Request } from 'express'
import { QueryParametersError } from '../../http/errors/QueryParametersError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'

export type QueryParameters = {
  limit: string
  offset: string
}
export type QueryBody = {
  title: string
  content: string
}
export class ArticleRequest {
  readonly query: QueryParameters
  readonly body: QueryBody = {
    title: '',
    content: '',
  }
  constructor({ query, body }: Request) {
    this.query = {
      limit: (query.limit as string | undefined) ?? '50',
      offset: (query.offset as string | undefined) ?? '0',
    }
    if (body.title) this.body.title = body.title
    if (body.content) this.body.content = body.content
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
  }
}
