import { FindAllArticlesOutput } from '../../application/article/output/FindAllArticlesOutput'
import { FindArticleOutput } from '../../application/article/output/FindArticleOutput'
import { FindArticleResponse } from './FindArticleResponse'
export class FindAllArticlesResponse {
  items: FindArticleResponse[] = []
  readonly total

  constructor(output: FindAllArticlesOutput) {
    output.item.items.map((article) => {
      const response = new FindArticleResponse(new FindArticleOutput(article))
      this.items.push(response)
    })
    this.total = output.item.total
  }
}
