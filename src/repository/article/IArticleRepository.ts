import { ArticleId } from '../../domain/article/valueObject/ArticleId'
import { Article } from '../../domain/article/entities/Article'
import { Articles } from '../../domain/article/entities/Articles'
import { QueryBody, QueryParameters } from '../../adapter/request/requestType'

export interface IArticleRepository {
  find(id: ArticleId): Promise<Article | null>
  findAll(query: QueryParameters): Promise<Articles | null>
  delete(id: ArticleId): Promise<void>
  edit(id: ArticleId, body: QueryBody): Promise<void>
  create(id: ArticleId, body: QueryBody): Promise<Article | null>
}
