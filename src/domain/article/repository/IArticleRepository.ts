import { ArticleId } from '../valueObject/ArticleId'
import { Article } from '../entities/Article'
import { Articles } from '../entities/Articles'

export type editArticleBody = {
  title: string
  content: string
}

export type createArticleBody = {
  title: string
  content: string
}

export type QueryParameters = {
  limit: string
  offset: string
}

export interface IArticleRepository {
  find(id: ArticleId): Promise<Article | null>
  findAll(query: QueryParameters): Promise<Articles | null>
  delete(id: ArticleId): Promise<void>
  edit(id: ArticleId, body: editArticleBody): Promise<void>
  create(id: ArticleId, body: createArticleBody): Promise<Article | null>
}
