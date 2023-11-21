import { CreateArticleOutput } from '../../application/article/output/CreateArticleOutput'
export class CreateArticleResponse {
  readonly id
  readonly title
  readonly content
  readonly createdAt
  readonly updatedAt

  constructor(output: CreateArticleOutput) {
    this.id = output.item.id.value
    this.title = output.item.title.value
    this.content = output.item.content.value
    this.createdAt = output.item.createdAt.value
    this.updatedAt = output.item.updatedAt.value
  }
}
