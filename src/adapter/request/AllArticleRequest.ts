import { Request } from 'express'
import { QueryParametersError } from '../../http/errors/QueryParametersError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'

export type QueryParameters = {
  limit: string
  offset: string
}
export class AllArticleRequest {
  readonly query: QueryParameters

  constructor({ query }: Request) {
    this.query = {
      limit: (query.limit as string | undefined) ?? '50',
      offset: (query.offset as string | undefined) ?? '0',
    }
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
