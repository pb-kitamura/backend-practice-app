import { Article } from '../../domain/models/article/entities/Article'
export class ArticleIdResponse {
  readonly id

  constructor(article: Article) {
    this.id = article.id.value
  }
}
