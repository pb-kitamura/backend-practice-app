import { IArticleRepository } from '../../../domain/article/repository/IArticleRepository'
import { FindAllArticlesInput } from '../input/FindAllArticlesInput'
import { FindAllArticlesOutput } from '../output/FindAllArticlesOutput'
import { NotFoundError } from '../../../http/errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../../http/httpStatus'

export interface FindAllArticlesUseCase {
  handle(input: FindAllArticlesInput): Promise<FindAllArticlesOutput>
}

export class FindAllArticlesInteractor implements FindAllArticlesUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}
  async handle(input: FindAllArticlesInput) {
    const query = input.getQueryParameters()
    const result = await this.articleRepository.findAll(query)
    if (!result) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    return new FindAllArticlesOutput(result)
  }
}
