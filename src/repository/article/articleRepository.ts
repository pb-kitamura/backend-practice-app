import config from '../../config/database'
import * as mysql from 'mysql2/promise'
import { IArticleRepository } from './iArticleRepository'
import { ArticleId } from '../../domain/models/article/valueObject/articleId'
import { ArticleTitle } from '../../domain/models/article/valueObject/articleTitle'
import { ArticleContent } from '../../domain/models/article/valueObject/articleContent'
import { CreatedAt } from '../../domain/models/article/valueObject/createdAt'
import { UpdatedAt } from '../../domain/models/article/valueObject/updatedAt'
import { Article } from '../../domain/models/article/entities/article'
import { DataBaseError } from '../../http/Errors/DataBaseError'
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
    if (Object.keys(result).length === 0) {
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
}
