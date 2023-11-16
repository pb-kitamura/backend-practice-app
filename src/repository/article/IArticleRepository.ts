import { ArticleId } from '../../domain/models/article/valueObject/ArticleId'
import { Article } from '../../domain/models/article/entities/Article'
import { Articles } from '../../domain/models/article/entities/Articles'

export interface IArticleRepository {
  find(id: ArticleId): Promise<Article | null>
  findAll(): Promise<Articles | null>
  delete(id: ArticleId): Promise<void>
}
