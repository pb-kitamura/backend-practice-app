import { ArticleRepository } from './repository/article/ArticleRepository'
import { ArticleApplicationService } from './application/article/ArticleApplicationService'
import { ArticleController } from './controller/ArticleController'

const repository = new ArticleRepository()
const service = new ArticleApplicationService(repository)
export const articleController = new ArticleController(service)
