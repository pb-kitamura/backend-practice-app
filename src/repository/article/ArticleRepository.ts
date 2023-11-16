import config from '../../config/database'
import * as mysql from 'mysql2/promise'
import { IArticleRepository } from './IArticleRepository'
import { ArticleId } from '../../domain/models/article/valueObject/ArticleId'
import { ArticleTitle } from '../../domain/models/article/valueObject/ArticleTitle'
import { ArticleContent } from '../../domain/models/article/valueObject/ArticleContent'
import { CreatedAt } from '../../domain/models/article/valueObject/CreatedAt'
import { UpdatedAt } from '../../domain/models/article/valueObject/UpdatedAt'
import { Article } from '../../domain/models/article/entities/Article'
import { Articles } from '../../domain/models/article/entities/Articles'
import { DataBaseError } from '../../http/errors/DataBaseError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'

interface responseJson extends mysql.RowDataPacket {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export class ArticleRepository implements IArticleRepository {
  private table = 'article'
  public async find(id: ArticleId) {
    const connection = await mysql.createConnection(config.db).catch(() => {
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`
    const [result] = await connection.execute<responseJson[]>(sql, [id.value]).catch(() => {
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseQueryError)
    })
    if (this.notFindData(result)) {
      return null
    }
    return new Article(
      new ArticleId(result[0].id),
      new ArticleTitle(result[0].title),
      new ArticleContent(result[0].content),
      new CreatedAt(result[0].createdAt),
      new UpdatedAt(result[0].updatedAt),
    )
  }

  public async findAll() {
    const connection = await mysql.createConnection(config.db).catch(() => {
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `SELECT * FROM ${this.table}`
    const [result] = await connection.execute<responseJson[]>(sql).catch(() => {
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseQueryError)
    })
    if (this.notFindData(result)) {
      return null
    }
    const articles = new Articles()
    result.map((article) => {
      const articleItem = new Article(
        new ArticleId(article.id),
        new ArticleTitle(article.title),
        new ArticleContent(article.content),
        new CreatedAt(article.createdAt),
        new UpdatedAt(article.updatedAt),
      )
      articles.addItems(articleItem)
    })
    return articles
  }
  public async delete(id: ArticleId) {
    const connection = await mysql.createConnection(config.db).catch(() => {
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `DELETE FROM ${this.table} WHERE id = ?`
    await connection.execute<responseJson[]>(sql, [id.value]).catch(() => {
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseQueryError)
    })
  }

  private notFindData(data: object) {
    return Object.keys(data).length === 0
  }
}
