import { Article } from '../../../domain/article/entities/Article'
import { ArticleContent } from '../../../domain/article/valueObject/ArticleContent'
import { ArticleId } from '../../../domain/article/valueObject/ArticleId'
import { ArticleTitle } from '../../../domain/article/valueObject/ArticleTitle'
import { CreatedAt } from '../../../domain/article/valueObject/CreatedAt'
import { UpdatedAt } from '../../../domain/article/valueObject/UpdatedAt'

export type createArticleBodyInput = {
  title: string
  content: string
}

export class CreateArticleInput {
  constructor(private readonly body: createArticleBodyInput) {}
  getArticle() {
    const articleId = new Article(
      new ArticleId(),
      new ArticleTitle(this.body.title),
      new ArticleContent(this.body.content),
      new CreatedAt(),
      new UpdatedAt(),
    )
    return articleId
  }
}
