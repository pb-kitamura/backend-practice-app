import { ArticleId } from '../ValueObject/ArticleId'
import { ArticleTitle } from '../ValueObject/ArticleTitle'
import { ArticleContent } from '../ValueObject/ArticleContent'
import { CreatedAt } from '../ValueObject/CreatedAt'
import { UpdatedAt } from '../ValueObject/UpdatedAt'
import { EntitiesError } from '../../../../http/Errors/EntitiesError'
export class Article {
  private articleId: ArticleId
  private articleTitle: ArticleTitle
  private articleContent: ArticleContent
  private createdAt: CreatedAt
  private updatedAt: UpdatedAt

  constructor(
    articleId: ArticleId,
    articleTitle: ArticleTitle,
    articleContent: ArticleContent,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    if (articleId === null) {
      throw new EntitiesError(`artileId argument is null`)
    }
    if (articleTitle === null) {
      throw new EntitiesError(`artileTitle argument is null`)
    }
    if (articleContent === null) {
      throw new EntitiesError(`artileContent argument is null`)
    }
    if (createdAt === null) {
      throw new EntitiesError(`createdAt argument is null`)
    }
    if (updatedAt === null) {
      throw new EntitiesError(`updatedAt argument is null`)
    }
    this.articleId = articleId
    this.articleTitle = articleTitle
    this.articleContent = articleContent
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
  public getId() {
    return this.articleId.get()
  }
  public getTitle() {
    return this.articleTitle.get()
  }
  public getContent() {
    return this.articleContent.get()
  }
  public getCreatedAt() {
    return this.createdAt.get()
  }
  public getUpdatedAt() {
    return this.updatedAt.get()
  }
}
