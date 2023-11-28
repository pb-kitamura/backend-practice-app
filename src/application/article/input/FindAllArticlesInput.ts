import { Articles } from '../../../domain/article/entities/Articles'

export type QueryParametersInput = {
  limit: string
  offset: string
}

export class FindAllArticlesInput {
  constructor(private readonly queryParam: QueryParametersInput) {}

  getArticles() {
    const articles = new Articles([], 0)
    articles.limit = this.queryParam.limit
    articles.offset = this.queryParam.offset
    return articles
  }
}
