import { Article } from './Article'

export class Articles {
  constructor(
    readonly items: Article[],
    readonly total: number,
  ) {}
}
