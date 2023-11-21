import { Article } from '../../domain/article/entities/Article'
export class ArticleResponse {
  readonly id
  readonly title
  readonly content
  readonly createdAt
  readonly updatedAt

  constructor(article: Article) {
    this.id = article.id.value
    this.title = article.title.value
    this.content = article.content.value
    this.createdAt = article.createdAt.value
    this.updatedAt = article.updatedAt.value
  }
}
