import config from '../../../config/database'
import * as mysql from 'mysql2/promise'
import { IArticleRepository } from '../../../domain/article/repository/IArticleRepository'
import { ArticleId } from '../../../domain/article/valueObject/ArticleId'
import { ArticleTitle } from '../../../domain/article/valueObject/ArticleTitle'
import { ArticleContent } from '../../../domain/article/valueObject/ArticleContent'
import { CreatedAt } from '../../../domain/article/valueObject/CreatedAt'
import { UpdatedAt } from '../../../domain/article/valueObject/UpdatedAt'
import { Article } from '../../../domain/article/entities/Article'
import { Articles } from '../../../domain/article/entities/Articles'
import { DataBaseError } from '../../../http/errors/DataBaseError'
import { HTTP_ERROR_MESSAGE } from '../../../http/httpStatus'
import { editArticleBody } from '../../../domain/article/repository/IArticleRepository'
import { createArticleBody } from '../../../domain/article/repository/IArticleRepository'
import { QueryParameters } from '../../../domain/article/repository/IArticleRepository'

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
    const connection = await mysql.createConnection(config.db).catch((error) => {
      console.error(error)
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`
    const [result] = await connection.execute<responseJson[]>(sql, [id.value]).catch((error) => {
      console.error(error)
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

  public async findAll(query: QueryParameters) {
    const connection = await mysql.createConnection(config.db).catch((error) => {
      console.error(error)
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `SELECT * FROM ${this.table} LIMIT ? OFFSET ?`
    const [result] = await connection
      .execute<responseJson[]>(sql, [query.limit, query.offset])
      .catch((error) => {
        console.error(error)
        throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseQueryError)
      })
    if (this.notFindData(result)) {
      return null
    }
    const items = result.map((item) => {
      const articleItem = new Article(
        new ArticleId(item.id),
        new ArticleTitle(item.title),
        new ArticleContent(item.content),
        new CreatedAt(item.createdAt),
        new UpdatedAt(item.updatedAt),
      )
      return articleItem
    })
    const articles = new Articles(items, items.length)
    return articles
  }

  public async delete(id: ArticleId) {
    const connection = await mysql.createConnection(config.db).catch((error) => {
      console.error(error)
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `DELETE FROM ${this.table} WHERE id = ?`
    await connection.execute<responseJson[]>(sql, [id.value]).catch((error) => {
      console.error(error)
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseQueryError)
    })
  }

  public async edit(id: ArticleId, body: editArticleBody) {
    const connection = await mysql.createConnection(config.db).catch((error) => {
      console.error(error)
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `UPDATE ${this.table} SET title = ?, content = ? WHERE id = ?`
    await connection
      .execute<responseJson[]>(sql, [body.title, body.content, id.value])
      .catch((error) => {
        console.error(error)
        throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseQueryError)
      })
  }

  public async create(id: ArticleId, body: createArticleBody) {
    const connection = await mysql.createConnection(config.db).catch((error) => {
      console.error(error)
      throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
    })
    const sql = `INSERT INTO ${this.table}(id,title,content) VALUES(?,?,?)`
    await connection
      .execute<responseJson[]>(sql, [id.value, body.title, body.content])
      .catch((error) => {
        console.error(error)
        throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseQueryError)
      })
    return this.find(id)
  }

  private notFindData(data: object) {
    return Object.keys(data).length === 0
  }
}
