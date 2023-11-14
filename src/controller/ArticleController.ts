import { Response } from 'express'
import { IArticleApplicationService } from '../application/article/IArticleApplicationService'
import { HTTP_STATUS_CODE } from '../http/httpStatus'
import { NotFoundError } from '../http/errors/NotFoundError'
import { DataBaseError } from '../http/errors/DataBaseError'
import { ArticleResponse } from './response/ArticleResponse'
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
}
