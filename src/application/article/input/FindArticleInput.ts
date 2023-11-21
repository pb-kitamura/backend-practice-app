import { ArticleId } from '../../../domain/article/valueObject/ArticleId'

export class FindArticleInput {
  constructor(private readonly id: string) {}
  getArticleId() {
    const articleId = new ArticleId(this.id)
    return articleId
  }
}
