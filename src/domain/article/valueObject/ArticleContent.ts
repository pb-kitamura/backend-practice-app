import { ValueObjectError } from '../../../http/errors/ValueobjectError'
export class ArticleContent {
  constructor(readonly value: string | null = null) {
    if (value && value.length > 100000) {
      throw new ValueObjectError('content is less than 100000')
    }
  }
}
