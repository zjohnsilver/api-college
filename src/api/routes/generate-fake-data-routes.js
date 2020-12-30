import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GenerateFakeStudents
} from '@controllers/generate-fake-data'
import { FakerRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.post('/generate-fake-data/students', adaptRoute(new GenerateFakeStudents(new FakerRepository(pool))))
}
