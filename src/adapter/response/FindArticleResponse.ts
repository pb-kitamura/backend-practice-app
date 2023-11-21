import { FindArticleOutput } from '../../application/article/output/FindArticleOutput'
export class FindArticleResponse {
  readonly id
  readonly title
  readonly content
  readonly createdAt
  readonly updatedAt

  constructor(output: FindArticleOutput) {
    this.id = output.item.id.value
    this.title = output.item.title.value
    this.content = output.item.content.value
    this.createdAt = output.item.createdAt.value
    this.updatedAt = output.item.updatedAt.value
  }
}
