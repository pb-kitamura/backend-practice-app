import { ArticleId } from '../../domain/models/article/valueObject/articleId'
import { Article } from '../../domain/models/article/entities/article'

export interface IArticleRepository {
  find(id: ArticleId): Promise<Article | null>
}
