import { Response, Request } from 'express'
import { IArticleApplicationService } from '../../application/article/IArticleApplicationService'
import { HTTP_STATUS_CODE } from '../../http/httpStatus'
import { NotFoundError } from '../../http/errors/NotFoundError'
import { DataBaseError } from '../../http/errors/DataBaseError'
import { QueryParametersError } from '../../http/errors/QueryParametersError'
import { ArticleResponse } from '../response/ArticleResponse'
import { AllArticlesResponse } from '../response/AllArticlesResponse'
import { ArticleIdResponse } from '../response/ArticleIdResponse'
import { AllArticleRequest } from '../request/AllArticleRequest'
import { EditArticleRequest } from '../request/EditArticleRequest'
import { QueryBodyError } from '../../http/errors/QueryBodyError'

export class ArticleController {
  constructor(private readonly articleService: IArticleApplicationService) {}

  public async getArticle(req: Request, res: Response) {
    try {
      const article = await this.articleService.get(req.params.id)
      const response = new ArticleResponse(article)
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(response))
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS_CODE.NotFound).send(JSON.stringify({ message: error.message }))
      } else if (error instanceof DataBaseError) {
        res.status(HTTP_STATUS_CODE.DataBaseError).send(JSON.stringify({ message: error.message }))
      } else
        res
          .status(HTTP_STATUS_CODE.InternalServerError)
          .send(JSON.stringify({ message: `${error}` }))
    }
  }

  public async getAllArticles(req: Request, res: Response) {
    try {
      const { query } = new AllArticleRequest(req)
      const articles = await this.articleService.getAll(query)
      const response = new AllArticlesResponse(articles)
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

  public async deleteArticle(req: Request, res: Response) {
    try {
      const article = await this.articleService.delete(req.params.id)
      const response = new ArticleIdResponse(article)
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(response))
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS_CODE.NotFound).send(JSON.stringify({ message: error.message }))
      } else if (error instanceof DataBaseError) {
        res.status(HTTP_STATUS_CODE.DataBaseError).send(JSON.stringify({ message: error.message }))
      } else
        res
          .status(HTTP_STATUS_CODE.InternalServerError)
          .send(JSON.stringify({ message: `${error}` }))
    }
  }

  public async editArticle(req: Request, res: Response) {
    try {
      const { body } = new EditArticleRequest(req)
      const article = await this.articleService.edit(req.params.id, body)
      const response = new ArticleIdResponse(article)
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(response))
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS_CODE.NotFound).send(JSON.stringify({ message: error.message }))
      } else if (error instanceof DataBaseError) {
        res.status(HTTP_STATUS_CODE.DataBaseError).send(JSON.stringify({ message: error.message }))
      } else if (error instanceof QueryBodyError) {
        res.status(HTTP_STATUS_CODE.QueryBodyError).send(JSON.stringify({ message: error.message }))
      } else {
        res
          .status(HTTP_STATUS_CODE.InternalServerError)
          .send(JSON.stringify({ message: `${error}` }))
      }
    }
  }
}
