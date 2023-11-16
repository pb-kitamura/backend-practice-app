import { Article } from './Article'

export class Articles {
  readonly items: Article[] = []
  total: number = 0

  public addItems(article: Article) {
    this.items.push(article)
    this.total += 1
  }
}
