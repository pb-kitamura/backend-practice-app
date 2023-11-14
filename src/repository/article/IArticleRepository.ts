import { ArticleId } from '../../domain/models/article/valueObject/ArticleId'
import { Article } from '../../domain/models/article/entities/Article'

export interface IArticleRepository {
  find(id: ArticleId): Promise<Article | null>
}
