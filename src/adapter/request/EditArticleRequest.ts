import { Request } from 'express'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'
import { QueryBodyError } from '../../http/errors/QueryBodyError'

export type editArticleBody = {
  title: string
  content: string
}

export class EditArticleRequest {
  readonly body: editArticleBody = {
    title: '',
    content: '',
  }
  constructor({ body }: Request) {
    if (!body.title) throw new QueryBodyError(HTTP_ERROR_MESSAGE.QueryBodyError)
    this.body.title = body.title
    if (body.content) this.body.content = body.content
  }
}
