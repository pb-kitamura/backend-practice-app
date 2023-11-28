import { Article } from '../entities/Article'
import { Articles } from '../entities/Articles'

export type QueryParameters = {
  limit: string
  offset: string
}

export interface IArticleRepository {
  find(article: Article): Promise<Article | null>
  findAll(query: QueryParameters): Promise<Articles | null>
  delete(article: Article): Promise<void>
  edit(article: Article): Promise<void>
  create(article: Article): Promise<Article | null>
}
