import { Request } from 'express'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'
import { QueryBodyError } from '../../http/errors/QueryBodyError'
import { createArticleBodyInput } from '../../application/article/input/CreateArticleInput'
export class CreateArticleRequest {
  readonly body: createArticleBodyInput = {
    title: '',
    content: '',
  }
  constructor({ body }: Request) {
    if (!body.title) throw new QueryBodyError(HTTP_ERROR_MESSAGE.QueryBodyError)
    this.body.title = body.title
    if (body.content) this.body.content = body.content
  }
}
