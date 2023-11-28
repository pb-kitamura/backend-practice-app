import { NotFoundError } from '../../../http/errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../../http/httpStatus'
import { IArticleRepository } from '../../../domain/article/repository/IArticleRepository'
import { EditArticleInput } from '../input/EditArticleInput'
import { EditArticleOutput } from '../output/EditArticleOutput'

export interface EditArticleUseCase {
  handle(input: EditArticleInput): Promise<EditArticleOutput>
}

export class EditArticleInteractor implements EditArticleUseCase {
  constructor(private readonly articleRepository: IArticleRepository) {}

  async handle(input: EditArticleInput) {
    const article = input.getArticle()
    const result = await this.articleRepository.find(article)
    if (!result) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    await this.articleRepository.edit(article)
    return new EditArticleOutput(result)
  }
}
