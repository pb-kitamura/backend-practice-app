import { NotFoundError } from '../../../http/errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../../http/httpStatus'
import { ArticleRepository } from '../../../infrastructure/repository/article/ArticleRepository'
import { EditArticleInput } from '../input/EditArticleInput'
import { EditArticleOutput } from '../output/EditArticleOutput'

export interface EditArticleUseCase {
  handle(input: EditArticleInput): Promise<EditArticleOutput>
}

export class EditArticleInteractor implements EditArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async handle(input: EditArticleInput) {
    const articleId = input.getArticleId()
    const result = await this.articleRepository.find(articleId)
    if (!result) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    const body = input.getBody()
    await this.articleRepository.edit(articleId, body)
    return new EditArticleOutput(result)
  }
}
