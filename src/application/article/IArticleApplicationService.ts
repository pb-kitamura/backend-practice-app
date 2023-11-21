import { Article } from '../../domain/article/entities/Article'
import { Articles } from '../../domain/article/entities/Articles'
import { editArticleBody } from '../../adapter/request/EditArticleRequest'
import { createArticleBody } from '../../adapter/request/CreateArticleRequest'
import { QueryParameters } from '../../adapter/request/AllArticleRequest'

export interface IArticleApplicationService {
  get(id: string): Promise<Article>
  getAll(query: QueryParameters): Promise<Articles>
  delete(id: string): Promise<Article>
  edit(id: string, body: editArticleBody): Promise<Article>
  create(body: createArticleBody): Promise<Article>
}
