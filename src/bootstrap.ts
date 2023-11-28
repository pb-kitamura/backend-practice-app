import { ArticleRepository } from './infrastructure/repository/article/ArticleRepository'
import { ArticleController } from './adapter/controller/ArticleController'
import { FindArticleInteractor } from './application/article/usecase/FIndArticleUseCase'
import { CreateArticleInteractor } from './application/article/usecase/CreateArticleUseCase'
import { FindAllArticlesInteractor } from './application/article/usecase/FindAllArticlesUseCase'
import { DeleteArticleInteractor } from './application/article/usecase/DeleteArticleUseCase'
import { EditArticleInteractor } from './application/article/usecase/EditArticleUseCase'

const repository = new ArticleRepository()
const findArticleUseCase = new FindArticleInteractor(repository)
const findAllArticlesUseCase = new FindAllArticlesInteractor(repository)
const createArticleUseCase = new CreateArticleInteractor(repository)
const deleteArticleUseCase = new DeleteArticleInteractor(repository)
const editArticleUseCase = new EditArticleInteractor(repository)
export const articleController = new ArticleController(
  findArticleUseCase,
  findAllArticlesUseCase,
  createArticleUseCase,
  deleteArticleUseCase,
  editArticleUseCase,
)
