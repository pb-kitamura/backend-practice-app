import { QueryParameters } from '../../adapter/request/AllArticleRequest'
import { Article } from '../../domain/article/entities/Article'
import { Articles } from '../../domain/article/entities/Articles'
import { QueryBody } from '../../adapter/request/EditArticleRequest'
export interface IArticleApplicationService {
  get(id: string): Promise<Article>
  getAll(query: QueryParameters): Promise<Articles>
  delete(id: string): Promise<Article>
  edit(id: string, body: QueryBody): Promise<Article>
  create(body: QueryBody): Promise<Article>
}
