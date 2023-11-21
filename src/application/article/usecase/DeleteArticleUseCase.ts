import { ArticleRepository } from '../../../infrastructure/repository/article/ArticleRepository'
import { DeleteArticleInput } from '../input/DeleteArticleInput'
import { DeleteArticleOutput } from '../output/DeleteArticleOutput'
import { NotFoundError } from '../../../http/errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../../http/httpStatus'
export interface DeleteArticleUseCase {
  handle(input: DeleteArticleInput): Promise<DeleteArticleOutput>
}

export class DeleteArticleInteractor implements DeleteArticleUseCase {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async handle(input: DeleteArticleInput) {
    const articleId = input.getArticleId()
    const result = await this.articleRepository.find(articleId)
    if (!result) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    await this.articleRepository.delete(articleId)
    return new DeleteArticleOutput(result)
  }
}
