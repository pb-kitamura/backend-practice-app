import { IArticleRepository } from '../../repository/article/IArticleRepository'
import { ArticleId } from '../../domain/models/article/valueObject/ArticleId'
import { NotFoundError } from '../../http/errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'
import { IArticleApplicationService } from './IArticleApplicationService'
import { queryParameters } from '../../adapter/request/ArticleRequest'
export class ArticleApplicationService implements IArticleApplicationService {
  constructor(private readonly articleRepository: IArticleRepository) {}
  public async get(id: string) {
    const articleId = new ArticleId(id)
    const article = await this.articleRepository.find(articleId)
    if (!article) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    return article
  }

  public async getAll(query: queryParameters) {
    const articles = await this.articleRepository.findAll(query)
    if (!articles) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    return articles
  }

  public async delete(id: string) {
    const articleId = new ArticleId(id)
    const article = await this.articleRepository.find(articleId)
    if (!article) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    await this.articleRepository.delete(articleId)
    return article
  }
}
