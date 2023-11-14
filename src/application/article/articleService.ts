import { IArticleRepository } from '../../repository/article/iArticleRepository'
import { ArticleId } from '../../domain/models/article/valueObject/articleId'
import { NotFoundError } from '../../http/Errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'
export class ArticleApplicationService {
  private articleRepository: IArticleRepository
  constructor(articleRepository: IArticleRepository) {
    this.articleRepository = articleRepository
  }
  public async get(id: string) {
    const articleId = new ArticleId(id)
    const article = await this.articleRepository.find(articleId)
    if (article === null) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    return article
  }
}
