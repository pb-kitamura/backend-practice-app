import { Router } from 'express'
import { ArticleController } from '../Controller/articleController'
export const articleRouter = Router()
const articleController = new ArticleController()
articleRouter.get('/:id', (req, res) => {
  articleController.getArticle(res, req.params.id)
})
