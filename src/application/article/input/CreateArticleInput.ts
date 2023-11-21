import { createArticleBody } from '../../../adapter/request/CreateArticleRequest'
import { ArticleId } from '../../../domain/article/valueObject/ArticleId'

export class CreateArticleInput {
  constructor(private readonly body: createArticleBody) {}
  getArticleId() {
    const articleId = new ArticleId()
    return articleId
  }
  getBody() {
    return this.body
  }
}
