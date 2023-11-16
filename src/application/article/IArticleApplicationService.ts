import { QueryParameters } from '../../adapter/request/ArticleRequest'
import { Article } from '../../domain/models/article/entities/Article'
import { Articles } from '../../domain/models/article/entities/Articles'

export interface IArticleApplicationService {
  get(id: string): Promise<Article>
  getAll(query: QueryParameters): Promise<Articles>
  delete(id: string): Promise<Article>
}
