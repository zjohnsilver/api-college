import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GenerateFakeStudents,
  GenerateFakeTeachers
} from '@controllers/generate-fake-data'
import { StudentRepository, TeacherRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.post('/generate-fake-data/students', adaptRoute(new GenerateFakeStudents(new StudentRepository(pool))))
  router.post('/generate-fake-data/teachers', adaptRoute(new GenerateFakeTeachers(new TeacherRepository(pool))))
}
