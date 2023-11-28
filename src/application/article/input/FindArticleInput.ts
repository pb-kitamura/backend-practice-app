import { ArticleId } from '../../../domain/article/valueObject/ArticleId'
import { ArticleTitle } from '../../../domain/article/valueObject/ArticleTitle'
import { Article } from '../../../domain/article/entities/Article'
import { ArticleContent } from '../../../domain/article/valueObject/ArticleContent'
import { CreatedAt } from '../../../domain/article/valueObject/CreatedAt'
import { UpdatedAt } from '../../../domain/article/valueObject/UpdatedAt'

export class FindArticleInput {
  constructor(private readonly id: string) {}
  getArticle() {
    const article = new Article(
      new ArticleId(this.id),
      new ArticleTitle(),
      new ArticleContent(),
      new CreatedAt(),
      new UpdatedAt(),
    )
    return article
  }
}
