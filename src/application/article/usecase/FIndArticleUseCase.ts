import { IArticleRepository } from '../../../domain/article/repository/IArticleRepository'
import { FindArticleInput } from '../input/FindArticleInput'
import { FindArticleOutput } from '../output/FindArticleOutput'
import { NotFoundError } from '../../../http/errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../../http/httpStatus'
export interface FindArticleUseCase {
  handle(input: FindArticleInput): Promise<FindArticleOutput>
}

export class FindArticleInteractor implements FindArticleUseCase {
  constructor(private readonly artiicleRepository: IArticleRepository) {}
  async handle(input: FindArticleInput) {
    const articleId = input.getArticleId()
    const result = await this.artiicleRepository.find(articleId)
    if (!result) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    return new FindArticleOutput(result)
  }
}
