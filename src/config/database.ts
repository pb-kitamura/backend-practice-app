import * as dotenv from 'dotenv'
dotenv.config()
export default {
  /**
   * APIサーバーのPORT番号
   */
  api: { port: process.env.SERVER_PORT },

  /**
   * databaseの設定
   */
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
}
