export type QueryParametersInput = {
  limit: string
  offset: string
}

export class FindAllArticlesInput {
  constructor(private readonly queryParam: QueryParametersInput) {}
  getQueryParameters() {
    return this.queryParam
  }
}
