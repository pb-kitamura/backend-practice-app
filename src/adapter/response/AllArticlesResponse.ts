import { Articles } from '../../domain/article/entities/Articles'
import { ArticleResponse } from './ArticleResponse'
export class AllArticlesResponse {
  items: ArticleResponse[] = []
  readonly total

  constructor(articles: Articles) {
    articles.items.map((article) => {
      const response = new ArticleResponse(article)
      this.items.push(response)
    })
    this.total = articles.total
  }
  public toLimitItems(start: number, end: number) {
    this.items = this.items.slice(start, end)
  }
}
