import { Article } from '../../domain/models/article/entities/Article'
export class ArticleDeleteResponse {
  readonly id

  constructor(article: Article) {
    this.id = article.id.value
  }
}
