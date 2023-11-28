import { Article } from '../../../domain/article/entities/Article'
import { ArticleContent } from '../../../domain/article/valueObject/ArticleContent'
import { ArticleId } from '../../../domain/article/valueObject/ArticleId'
import { ArticleTitle } from '../../../domain/article/valueObject/ArticleTitle'
import { CreatedAt } from '../../../domain/article/valueObject/CreatedAt'
import { UpdatedAt } from '../../../domain/article/valueObject/UpdatedAt'

export type editArticleBodyInput = {
  title: string
  content: string
}

export class EditArticleInput {
  constructor(
    private readonly id: string,
    private readonly body: editArticleBodyInput,
  ) {}
  getArticle() {
    const article = new Article(
      new ArticleId(this.id),
      new ArticleTitle(this.body.title),
      new ArticleContent(this.body.content),
      new CreatedAt(),
      new UpdatedAt(),
    )
    return article
  }
}
