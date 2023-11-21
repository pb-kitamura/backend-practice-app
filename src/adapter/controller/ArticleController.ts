import { Response, Request } from 'express'
import { HTTP_STATUS_CODE } from '../../http/httpStatus'
import { NotFoundError } from '../../http/errors/NotFoundError'
import { DataBaseError } from '../../http/errors/DataBaseError'
import { QueryParametersError } from '../../http/errors/QueryParametersError'
import { QueryBodyError } from '../../http/errors/QueryBodyError'
import { DuplicateIdError } from '../../http/errors/DuplicateIdError'
import { FindArticleResponse } from '../response/FindArticleResponse'
import { FindAllArticlesResponse } from '../response/FindAllArticlesResponse'
import { DeleteArticleResponse } from '../response/DeleteArticleResponse'
import { EditArticleResponse } from '../response/EditArticleResponse'
import { CreateArticleResponse } from '../response/CreateArticleResponse'
import { AllArticleRequest } from '../request/AllArticleRequest'
import { EditArticleRequest } from '../request/EditArticleRequest'
import { CreateArticleRequest } from '../request/CreateArticleRequest'
import { FindArticleInput } from '../../application/article/input/FindArticleInput'
import { FindAllArticlesInput } from '../../application/article/input/FindAllArticlesInput'
import { DeleteArticleInput } from '../../application/article/input/DeleteArticleInput'
import { EditArticleInput } from '../../application/article/input/EditArticleInput'
import { CreateArticleInput } from '../../application/article/input/CreateArticleInput'
import { FindArticleUseCase } from '../../application/article/usecase/FIndArticleUseCase'
import { FindAllArticlesUseCase } from '../../application/article/usecase/FindAllArticlesUseCase'
import { DeleteArticleUseCase } from '../../application/article/usecase/DeleteArticleUseCase'
import { EditArticleUseCase } from '../../application/article/usecase/EditArticleUseCase'
import { CreateArticleUseCase } from '../../application/article/usecase/CreateArticleUseCase'

export class ArticleController {
  constructor(
    private readonly findArticleUseCase: FindArticleUseCase,
    private readonly findAllArticlesUseCase: FindAllArticlesUseCase,
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
    private readonly editArticleUseCase: EditArticleUseCase,
  ) {}

  public async findArticle(req: Request, res: Response) {
    try {
      const input = new FindArticleInput(req.params.id)
      const output = await this.findArticleUseCase.handle(input)
      const response = new FindArticleResponse(output)
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

  public async findAllArticles(req: Request, res: Response) {
    try {
      const { query } = new AllArticleRequest(req)
      const input = new FindAllArticlesInput(query)
      const output = await this.findAllArticlesUseCase.handle(input)
      const response = new FindAllArticlesResponse(output)
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
      const input = new DeleteArticleInput(req.params.id)
      const output = await this.deleteArticleUseCase.handle(input)
      const response = new DeleteArticleResponse(output)
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
      const input = new EditArticleInput(req.params.id, body)
      const output = await this.editArticleUseCase.handle(input)
      const response = new EditArticleResponse(output)
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

  public async createArticle(req: Request, res: Response) {
    try {
      const { body } = new CreateArticleRequest(req)
      const input = new CreateArticleInput(body)
      const output = await this.createArticleUseCase.handle(input)
      const response = new CreateArticleResponse(output)
      res.status(HTTP_STATUS_CODE.OK).send(JSON.stringify(response))
    } catch (error) {
      if (error instanceof DuplicateIdError) {
        res
          .status(HTTP_STATUS_CODE.DuplicateIdError)
          .send(JSON.stringify({ message: error.message }))
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
