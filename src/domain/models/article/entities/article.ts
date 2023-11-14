import { ArticleId } from '../valueObject/articleId'
import { ArticleTitle } from '../valueObject/articleTitle'
import { ArticleContent } from '../valueObject/articleContent'
import { CreatedAt } from '../valueObject/createdAt'
import { UpdatedAt } from '../valueObject/updatedAt'
import { EntitiesError } from '../../../../http/errors/entitiesError'
export class Article {
  constructor(
    readonly id: ArticleId,
    readonly title: ArticleTitle,
    readonly content: ArticleContent,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
  ) {
    if (id === null) {
      throw new EntitiesError(`artileId argument is null`)
    }
    if (title === null) {
      throw new EntitiesError(`artileTitle argument is null`)
    }
    if (content === null) {
      throw new EntitiesError(`artileContent argument is null`)
    }
    if (createdAt === null) {
      throw new EntitiesError(`createdAt argument is null`)
    }
    if (updatedAt === null) {
      throw new EntitiesError(`updatedAt argument is null`)
    }
  }
}
