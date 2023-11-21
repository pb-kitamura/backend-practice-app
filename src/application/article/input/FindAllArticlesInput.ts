import { QueryParameters } from '../../../adapter/request/AllArticleRequest'

export class FindAllArticlesInput {
  constructor(private readonly queryParam: QueryParameters) {}
  getQueryParameters() {
    return this.queryParam
  }
}
