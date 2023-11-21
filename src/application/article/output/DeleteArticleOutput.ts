import { Article } from '../../../domain/article/entities/Article'

export class DeleteArticleOutput {
  constructor(readonly item: Article) {}
}
