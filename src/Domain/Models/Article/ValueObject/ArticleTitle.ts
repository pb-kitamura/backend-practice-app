import { ValueObjectError } from '../../../../http/Errors/ValueObjectError'

export class ArticleTitle {
  private title
  constructor(title: string) {
    if (title.length > 120) {
      throw new ValueObjectError('title is less than 120')
    }
    this.title = title
  }
  public get() {
    return this.title
  }
}
