import express from 'express'
import 'module-alias/register'
import env from './config/env'
import setupRoutes from './config/routes'
import { Logger } from '@loaders'
import swaggerRouter from './swagger/route'

const PORT = env.port

const app = express()
  .use(Logger('[:date] :method :url  (:status)  :response-time ms'))
setupRoutes(app)

app.use((req, res, next) => {
  const { originalUrl } = req

  const routesSwagger = ['/', '/swagger-ui.css', '/swagger-ui-bundle.js', '/swagger-ui-init.js', '/swagger-ui-standalone-preset.js', '/swagger-ui-init.js']

  if (!routesSwagger.includes(originalUrl)){
    res.status(404).send('Route Not Found')
    return
  }

  next()
})

app.use(swaggerRouter.base, swaggerRouter.router)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
