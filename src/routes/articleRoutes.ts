import { Router } from 'express'
import { articleController } from '../bootstrap'

export const articleRouter = Router()
articleRouter.get('/:id', (req, res) => {
  articleController.getArticle(res, req.params.id)
})
articleRouter.get('/', (req, res) => {
  articleController.getAllArticles(res, req.query)
})
articleRouter.delete('/:id', (req, res) => {
  articleController.deleteArticle(res, req.params.id)
})
