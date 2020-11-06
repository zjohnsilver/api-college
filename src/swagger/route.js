import path from 'path'
import { read } from 'yaml-import'
import swaggerUi from 'swagger-ui-express'
import { Router } from 'express'

const router = Router()

const swaggerDocs = read(path.join(__dirname, 'swaggerDocs.yaml'))

const options = {
  customCss: '.swagger-ui .topbar { display: none }'
}

export default {
  base: '/',
  router: router.use(
    '/',
    (req, _, next) => {
      swaggerDocs.host = req.get('host')
      req.swaggerDoc = swaggerDocs
      next()
    },
    swaggerUi.serve,
    swaggerUi.setup(null, options)
  )
}
