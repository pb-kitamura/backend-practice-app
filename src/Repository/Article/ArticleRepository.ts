import config from '../../Config/database'
import * as mysql from 'mysql2'
import { IArticleRepository } from './IArticleRepository'
import { ArticleId } from '../../Domain/Models/Article/ValueObject/ArticleId'
import { ArticleTitle } from '../../Domain/Models/Article/ValueObject/ArticleTitle'
import { ArticleContent } from '../../Domain/Models/Article/ValueObject/ArticleContent'
import { CreatedAt } from '../../Domain/Models/Article/ValueObject/CreatedAt'
import { UpdatedAt } from '../../Domain/Models/Article/ValueObject/UpdatedAt'
import { Article } from '../../Domain/Models/Article/Entities/article'
import { DataBaseError } from '../../http/Errors/DataBaseError'
import { HTTP_ERROR_MESSAGE } from '../../http/httpStatus'

type responseJson = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export class ArticleRepository implements IArticleRepository {
  private table = 'article'
  private connection
  constructor() {
    this.connection = mysql.createConnection(config.db)
    this.connection.connect((err) => {
      if (err) {
        throw new DataBaseError(HTTP_ERROR_MESSAGE.DataBaseConnectionError)
      }
      console.log('success')
    })
  }
  public find(id: ArticleId) {
    return new Promise<Article | null>((resolve) => {
      const query = `SELECT * FROM ${this.table} WHERE id = "${id.get()}" `
      this.connection.query(query, (error: string, result: responseJson[]) => {
        if (error) {
          throw new DataBaseError(`${HTTP_ERROR_MESSAGE.DataBaseQueryError} ${error} `)
        }
        if (Object.keys(result).length === 0) {
          resolve(null)
          return
        }
        resolve(
          new Article(
            new ArticleId(result[0].id),
            new ArticleTitle(result[0].title),
            new ArticleContent(result[0].content),
            new CreatedAt(result[0].createdAt),
            new UpdatedAt(result[0].updatedAt),
          ),
        )
      })
    })
  }
}
