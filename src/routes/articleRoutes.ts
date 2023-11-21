import { Router } from 'express'
import { articleController } from '../bootstrap'

export const articleRouter = Router()
articleRouter.get('/:id', (req, res) => {
  articleController.findArticle(req, res)
})
articleRouter.get('/', (req, res) => {
  articleController.findAllArticles(req, res)
})
articleRouter.delete('/:id', (req, res) => {
  articleController.deleteArticle(req, res)
})
articleRouter.put('/:id', (req, res) => {
  articleController.editArticle(req, res)
})
articleRouter.post('/', (req, res) => {
  articleController.createArticle(req, res)
})
