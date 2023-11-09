import { IArticleRepository } from '../../Repository/Article/IArticleRepository'
import { ArticleId } from '../../Domain/Models/Article/ValueObject/ArticleId'
import { ArticleData } from '../../Domain/Models/Article/DTO/articleData'
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
    return new ArticleData(article)
  }
}
