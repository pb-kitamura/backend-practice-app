import { Articles } from '../../../domain/article/entities/Articles'

export class FindAllArticlesOutput {
  constructor(readonly item: Articles) {}
}
