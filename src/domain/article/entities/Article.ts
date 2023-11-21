import { ArticleId } from '../valueObject/ArticleId'
import { ArticleTitle } from '../valueObject/ArticleTitle'
import { ArticleContent } from '../valueObject/ArticleContent'
import { CreatedAt } from '../valueObject/CreatedAt'
import { UpdatedAt } from '../valueObject/UpdatedAt'
import { EntitiesError } from '../../../http/errors/EntitiesError'
export class Article {
  constructor(
    readonly id: ArticleId,
    readonly title: ArticleTitle,
    readonly content: ArticleContent,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
  ) {
    if (!id) {
      throw new EntitiesError(`artileId argument is null`)
    }
    if (!title) {
      throw new EntitiesError(`artileTitle argument is null`)
    }
    if (!content) {
      throw new EntitiesError(`artileContent argument is null`)
    }
    if (!createdAt) {
      throw new EntitiesError(`createdAt argument is null`)
    }
    if (!updatedAt) {
      throw new EntitiesError(`updatedAt argument is null`)
    }
  }
}
