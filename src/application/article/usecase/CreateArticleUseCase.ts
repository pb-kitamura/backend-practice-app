import { IArticleRepository } from '../../../infrastructure/repository/article/IArticleRepository'
import { CreateArticleInput } from '../input/CreateArticleInput'
import { CreateArticleOutput } from '../output/CreateArticleOutput'
import { DuplicateIdError } from '../../../http/errors/DuplicateIdError'
import { HTTP_ERROR_MESSAGE } from '../../../http/httpStatus'
import { NotFoundError } from '../../../http/errors/NotFoundError'

export interface CreateArticleUseCase {
  handle(input: CreateArticleInput): Promise<CreateArticleOutput>
}

export class CreateArticleInteractor implements CreateArticleUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}

  async handle(input: CreateArticleInput) {
    const articleId = input.getArticleId()
    const result = await this.articleRepository.find(articleId)
    if (result) {
      throw new DuplicateIdError(HTTP_ERROR_MESSAGE.DuplicateIdError)
    }
    const body = input.getBody()
    const newArticle = await this.articleRepository.create(articleId, body)
    if (!newArticle) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    return new CreateArticleOutput(newArticle)
  }
}
