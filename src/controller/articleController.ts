import { Response } from 'express'
import { ArticleRepository } from '../repository/article/articleRepository'
import { ArticleApplicationService } from '../application/article/articleService'
import { HTTP_STATUS_CODE } from '../http/httpStatus'
import { NotFoundError } from '../http/errors/notFoundError'
import { DataBaseError } from '../http/errors/dataBaseError'
import { ArticleResponse } from './response/articleResponse'
export class ArticleController {
  public async getArticle(res: Response, id: string) {
    try {
      const service = new ArticleApplicationService(new ArticleRepository())
      const article = await service.get(id)
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
