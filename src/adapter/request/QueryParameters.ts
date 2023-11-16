import { QueryParametersError } from '../../http/errors/QueryParametersError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'

export type queryParameters = {
  limit?: string
  offset?: string
}

export class QueryParameters {
  readonly limit: string = '50'
  readonly offset: string = '0'
  constructor(query: queryParameters) {
    if (!this.isQueryParametersCorrect(query)) {
      throw new QueryParametersError(HTTP_ERROR_MESSAGE.QueryParametersError)
    }
    if (query.limit) {
      this.limit = query.limit
    }
    if (query.offset) {
      this.offset = query.offset
    }
  }

  private isQueryParametersCorrect(query: queryParameters) {
    for (const key in query) {
      //クエリに違うプロパティがあった場合
      if (key !== 'limit' && key !== 'offset') {
        return false
        //limitのパラメータが数字以外 or 50より上の場合
      } else if (key === 'limit' && (isNaN(Number(query.limit)) || Number(query.limit) > 50)) {
        return false
        //offsetのパラメータが数字以外の場合
      } else if (key === 'offset' && isNaN(Number(query.offset))) {
        return false
      }
    }
    return true
  }
}
