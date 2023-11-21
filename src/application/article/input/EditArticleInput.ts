import { createArticleBody } from '../../../adapter/request/CreateArticleRequest'
import { ArticleId } from '../../../domain/article/valueObject/ArticleId'

export class EditArticleInput {
  constructor(
    private readonly id: string,
    private readonly body: createArticleBody,
  ) {}
  getArticleId() {
    const articleId = new ArticleId(this.id)
    return articleId
  }
  getBody() {
    return this.body
  }
}
