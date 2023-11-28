import { Article } from './Article'

export class Articles {
  limit?: string
  offset?: string

  constructor(
    readonly items: Article[],
    readonly total: number,
  ) {}
}
