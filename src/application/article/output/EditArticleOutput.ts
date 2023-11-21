import { Article } from '../../../domain/article/entities/Article'

export class EditArticleOutput {
  constructor(readonly item: Article) {}
}
