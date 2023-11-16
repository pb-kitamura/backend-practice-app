import { Response } from 'express'
import { IArticleApplicationService } from '../application/article/IArticleApplicationService'
import { HTTP_STATUS_CODE } from '../http/httpStatus'
import { NotFoundError } from '../http/errors/NotFoundError'
import { QueryParametersError } from '../http/errors/QueryParametersError'
import { DataBaseError } from '../http/errors/DataBaseError'
import { ArticleResponse } from './response/ArticleResponse'
import { AllArticlesResponse } from './response/AllArticlesResponse'
import { HTTP_ERROR_MESSAGE } from '../http/httpStatus'
import { ArticleDeleteResponse } from './response/ArticleDeleteResponse'

type queryParameters = {
  limit?: string
  offset?: string
}

export class ArticleController {
  constructor(private readonly articleService: IArticleApplicationService) {}
  public async getArticle(res: Response, id: string) {
    try {
      const article = await this.articleService.get(id)
      const response = new ArticleResponse(article)
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(response))
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS_CODE.NotFound).send(error.message)
      } else if (error instanceof DataBaseError) {
        res.status(HTTP_STATUS_CODE.DataBaseError).send(error.message)
      } else res.status(HTTP_STATUS_CODE.InternalServerError).send(`${error}`)
    }
  }

  public async getAllArticles(res: Response, query: queryParameters) {
    try {
      if (!this.isQueryParametersCorrect(query)) {
        throw new QueryParametersError(HTTP_ERROR_MESSAGE.QueryParametersError)
      }
      const articles = await this.articleService.getAll()
      const response = new AllArticlesResponse(articles)
      if (query.limit && query.offset) {
        const startIndex =
          (Number(query.offset) - 1) * Number(query.limit) < 0
            ? 0
            : (Number(query.offset) - 1) * Number(query.limit)
        const endIndex = startIndex + Number(query.limit)
        response.toLimitItems(startIndex, endIndex)
      } else if (query.limit) {
        response.toLimitItems(0, Number(query.limit))
      } else if (query.offset && Number(query.offset) !== 0 && Number(query.offset) !== 1) {
        response.toLimitItems(0, 0)
      }
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(response))
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS_CODE.NotFound).send(JSON.stringify({ message: error.message }))
      } else if (error instanceof QueryParametersError) {
        res
          .status(HTTP_STATUS_CODE.QueryParametersError)
          .send(JSON.stringify({ message: error.message }))
      } else if (error instanceof DataBaseError) {
        res.status(HTTP_STATUS_CODE.DataBaseError).send(JSON.stringify({ message: error.message }))
      } else
        res
          .status(HTTP_STATUS_CODE.InternalServerError)
          .send(JSON.stringify({ message: `${error}` }))
    }
  }

  public async deleteArticle(res: Response, id: string) {
    try {
      const article = await this.articleService.delete(id)
      const response = new ArticleDeleteResponse(article)
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(response))
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS_CODE.NotFound).send(error.message)
      } else if (error instanceof DataBaseError) {
        res.status(HTTP_STATUS_CODE.DataBaseError).send(error.message)
      } else res.status(HTTP_STATUS_CODE.InternalServerError).send(`${error}`)
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
