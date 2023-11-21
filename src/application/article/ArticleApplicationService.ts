import { IArticleRepository } from '../../repository/article/IArticleRepository'
import { ArticleId } from '../../domain/article/valueObject/ArticleId'
import { NotFoundError } from '../../http/errors/NotFoundError'
import { DuplicateIdError } from '../../http/errors/DuplicateIdError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'
import { IArticleApplicationService } from './IArticleApplicationService'
import { editArticleBody } from '../../adapter/request/EditArticleRequest'
import { createArticleBody } from '../../adapter/request/CreateArticleRequest'
import { QueryParameters } from '../../adapter/request/AllArticleRequest'

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

  public async edit(id: string, body: editArticleBody) {
    const articleId = new ArticleId(id)
    const article = await this.articleRepository.find(articleId)
    if (!article) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    await this.articleRepository.edit(articleId, body)
    return article
  }

  public async create(body: createArticleBody) {
    const articleId = new ArticleId()
    const article = await this.articleRepository.find(articleId)
    if (article) {
      throw new DuplicateIdError(HTTP_ERROR_MESSAGE.NotFound)
    }
    const newArticle = await this.articleRepository.create(articleId, body)
    if (!newArticle) {
      throw new NotFoundError(HTTP_ERROR_MESSAGE.NotFound)
    }
    return newArticle
  }
}
