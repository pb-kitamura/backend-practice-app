import { ValueObjectError } from '../../../../http/errors/ValueobjectError'

export class ArticleContent {
  constructor(readonly value: string) {
    if (value.length > 100000) {
      throw new ValueObjectError('content is less than 100000')
    }
  }
}
