import { EditArticleOutput } from '../../application/article/output/EditArticleOutput'

export class EditArticleResponse {
  readonly id

  constructor(output: EditArticleOutput) {
    this.id = output.item.id.value
  }
}
