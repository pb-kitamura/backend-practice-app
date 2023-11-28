import { Article } from '../../../domain/article/entities/Article'

export class FindArticleOutput {
  constructor(readonly item: Article) {}
}
