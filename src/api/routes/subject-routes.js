import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GetSubject
} from '@controllers/subject'
import { SubjectRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.get('/subjects/:subject_id', adaptRoute(new GetSubject(new SubjectRepository(pool))))
}
