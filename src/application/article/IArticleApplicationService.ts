import { Article } from '../../domain/models/article/entities/Article'

export interface IArticleApplicationService {
  get(id: string): Promise<Article>
}
