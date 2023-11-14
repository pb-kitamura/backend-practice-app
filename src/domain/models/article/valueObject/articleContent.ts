import { ValueObjectError } from '../../../../http/Errors/ValueObjectError'

export class ArticleContent {
  constructor(readonly value: string) {
    if (value.length > 100000) {
      throw new ValueObjectError('content is less than 100000')
    }
  }
}
