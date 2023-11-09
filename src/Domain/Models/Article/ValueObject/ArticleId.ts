import { ulid } from 'ulid'
export class ArticleId {
  private id
  constructor(id: string | null = null) {
    if (id === null) {
      this.id = ulid()
    } else {
      this.id = id
    }
  }
  public get() {
    return this.id
  }
}
