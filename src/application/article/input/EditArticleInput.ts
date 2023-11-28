import { ArticleId } from '../../../domain/article/valueObject/ArticleId'

export type editArticleBodyInput = {
  title: string
  content: string
}

export class EditArticleInput {
  constructor(
    private readonly id: string,
    private readonly body: editArticleBodyInput,
  ) {}
  getArticleId() {
    const articleId = new ArticleId(this.id)
    return articleId
  }
  getBody() {
    return this.body
  }
}
