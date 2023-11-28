import { FindAllArticlesOutput } from '../../application/article/output/FindAllArticlesOutput'
import { FindArticleOutput } from '../../application/article/output/FindArticleOutput'
import { FindArticleResponse } from './FindArticleResponse'
export class FindAllArticlesResponse {
  items: FindArticleResponse[] = []
  readonly total

  constructor(output: FindAllArticlesOutput) {
    this.items = output.item.items.map((article) => {
      return new FindArticleResponse(new FindArticleOutput(article))
    })
    this.total = output.item.total
  }
}
