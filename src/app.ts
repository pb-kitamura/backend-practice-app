import express from 'express'
import config from './config/database'
import { articleRouter } from './routes/articleRoutes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1/note', articleRouter)
app.listen(config.api.port, () => console.log(`Example app listening on port ${config.api.port}!`))
