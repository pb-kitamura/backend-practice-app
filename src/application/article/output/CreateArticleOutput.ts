import { Article } from '../../../domain/article/entities/Article'

export class CreateArticleOutput {
  constructor(readonly item: Article) {}
}
