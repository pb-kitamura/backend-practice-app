import { Router } from 'express'
import { articleController } from '../bootstrap'

export const articleRouter = Router()
articleRouter.get('/:id', (req, res) => {
  articleController.getArticle(req, res)
})
articleRouter.get('/', (req, res) => {
  articleController.getAllArticles(req, res)
})
articleRouter.delete('/:id', (req, res) => {
  articleController.deleteArticle(req, res)
})
articleRouter.put('/:id', (req, res) => {
  articleController.editArticle(req, res)
})
