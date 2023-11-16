import { Article } from '../../domain/models/article/entities/Article'
import { Articles } from '../../domain/models/article/entities/Articles'

export interface IArticleApplicationService {
  get(id: string): Promise<Article>
  getAll(): Promise<Articles>
  delete(id: string): Promise<Article>
}
