import { ArticleId } from '../../../domain/article/valueObject/ArticleId'
import { Article } from '../../../domain/article/entities/Article'
import { Articles } from '../../../domain/article/entities/Articles'
import { editArticleBody } from '../../../adapter/request/EditArticleRequest'
import { createArticleBody } from '../../../adapter/request/CreateArticleRequest'
import { QueryParameters } from '../../../adapter/request/AllArticleRequest'

export interface IArticleRepository {
  find(id: ArticleId): Promise<Article | null>
  findAll(query: QueryParameters): Promise<Articles | null>
  delete(id: ArticleId): Promise<void>
  edit(id: ArticleId, body: editArticleBody): Promise<void>
  create(id: ArticleId, body: createArticleBody): Promise<Article | null>
}
