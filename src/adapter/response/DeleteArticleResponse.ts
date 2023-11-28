import { DeleteArticleOutput } from '../../application/article/output/DeleteArticleOutput'

export class DeleteArticleResponse {
  readonly id

  constructor(output: DeleteArticleOutput) {
    this.id = output.item.id.value
  }
}
