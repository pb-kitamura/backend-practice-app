import { Router } from 'express'
import { articleController } from '../bootstrap'

export const articleRouter = Router()
articleRouter.get('/:id', (req, res) => {
  articleController.getArticle(res, req.params.id)
})
