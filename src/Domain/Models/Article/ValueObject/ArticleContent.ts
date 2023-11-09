import { ValueObjectError } from '../../../../http/Errors/ValueObjectError'

export class ArticleContent {
  private content
  constructor(content: string) {
    if (content.length > 100000) {
      throw new ValueObjectError('content is less than 100000')
    }
    this.content = content
  }
  public get() {
    return this.content
  }
}
