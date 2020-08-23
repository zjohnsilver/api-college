import express from 'express'
import 'module-alias/register'
import env from './config/env'
import setupRoutes from './config/routes'

const PORT = env.port

const app = express()
setupRoutes(app)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
