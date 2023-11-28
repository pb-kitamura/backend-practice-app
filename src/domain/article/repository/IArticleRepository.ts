import { Article } from '../entities/Article'
import { Articles } from '../entities/Articles'

export interface IArticleRepository {
  find(article: Article): Promise<Article | null>
  findAll(articles: Articles): Promise<Articles>
  delete(article: Article): Promise<void>
  edit(article: Article): Promise<void>
  create(article: Article): Promise<Article | null>
}
