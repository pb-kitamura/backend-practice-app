import { Router } from 'express'
import { ArticleController } from '../controller/articleController'
export const articleRouter = Router()
const articleController = new ArticleController()
articleRouter.get('/:id', (req, res) => {
  articleController.getArticle(res, req.params.id)
})
