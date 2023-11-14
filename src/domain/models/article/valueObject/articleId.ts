import { ulid } from 'ulid'
export class ArticleId {
  readonly value
  constructor(value: string | null = null) {
    if (value === null) {
      this.value = ulid()
    } else {
      this.value = value
    }
  }
}
