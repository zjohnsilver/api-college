import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GetStudentsByCourse
} from '@controllers/course'
import { StudentRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.get('/courses/:id/students', adaptRoute(new GetStudentsByCourse(new StudentRepository(pool))))
}
