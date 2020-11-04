import express from 'express'
import 'module-alias/register'
import env from './config/env'
import setupRoutes from './config/routes'
import { Logger } from '@loaders'
const PORT = env.port

const app = express()
  .use(Logger('[:date] :method :url  (:status)  :response-time ms'))
setupRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
