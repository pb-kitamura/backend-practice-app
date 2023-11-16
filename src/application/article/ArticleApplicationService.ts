import { IArticleRepository } from '../../repository/article/IArticleRepository'
import { ArticleId } from '../../domain/models/article/valueObject/ArticleId'
import { NotFoundError } from '../../http/errors/NotFoundError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'
import { IArticleApplicationService } from './IArticleApplicationService'
import { QueryBody, QueryParameters } from '../../adapter/request/ArticleRequest'
import { QueryBodyError } from '../../http/errors/QueryBodyError'
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

  public async getAll(query: QueryParameters) {
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

  public async edit(id: string, body: QueryBody) {
    if (!body.title) throw new QueryBodyError(HTTP_ERROR_MESSAGE.QueryBodyError)
    const articleId = new ArticleId(id)
    const article = await this.articleRepository.find(articleId)
    if (!article) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    await this.articleRepository.edit(articleId, body)
    return article
  }
}
