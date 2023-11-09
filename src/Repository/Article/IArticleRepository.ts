import { ArticleId } from '../../Domain/Models/Article/ValueObject/ArticleId'
import { Article } from '../../Domain/Models/Article/Entities/article'

export interface IArticleRepository {
  find(id: ArticleId): Promise<Article | null>
}
