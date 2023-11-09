import { Response } from 'express'
import { ArticleRepository } from '../Repository/Article/ArticleRepository'
import { ArticleApplicationService } from '../Application/Article/articleService'
import { HTTP_STATUS_CODE } from '../http/httpStatus'
import { NotFoundError } from '../http/Errors/NotFoundError'
import { DataBaseError } from '../http/Errors/DataBaseError'
export class ArticleController {
  public async getArticle(res: Response, id: string) {
    try {
      const service = new ArticleApplicationService(new ArticleRepository())
      const article = await service.get(id)
      console.log(JSON.stringify(article))
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(article))
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(HTTP_STATUS_CODE.NotFound).send(error.message)
        return
      } else if (error instanceof DataBaseError) {
        res.status(HTTP_STATUS_CODE.DataBaseError).send(error.message)
        return
      } else res.status(HTTP_STATUS_CODE.InternalServerError).send(`${error}`)
    }
  }
}
