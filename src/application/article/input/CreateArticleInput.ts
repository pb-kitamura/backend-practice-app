import { ArticleId } from '../../../domain/article/valueObject/ArticleId'

export type createArticleBodyInput = {
  title: string
  content: string
}

export class CreateArticleInput {
  constructor(private readonly body: createArticleBodyInput) {}
  getArticleId() {
    const articleId = new ArticleId()
    return articleId
  }
  getBody() {
    return this.body
  }
}
