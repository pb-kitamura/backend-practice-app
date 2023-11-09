import { Article } from '../Entities/article'
export class ArticleData {
  private id
  private title
  private content
  private createdAt
  private updatedAt

  constructor(article: Article) {
    this.id = article.getId()
    this.title = article.getTitle()
    this.content = article.getContent()
    this.createdAt = article.getCreatedAt()
    this.updatedAt = article.getUpdatedAt()
  }
  public getId() {
    return this.id
  }
  public getTitle() {
    return this.title
  }
  public getContent() {
    return this.content
  }
  public getCreatedAt() {
    return this.createdAt
  }
  public getUpdatedAt() {
    return this.updatedAt
  }
}
