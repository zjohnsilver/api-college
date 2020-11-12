import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GetStudent,
  GetAllStudents,
  GetStudentSubjects,
  GetStudentHistoric,
  CreateStudent
} from '@controllers/student'
import { StudentRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.get('/students/:id', adaptRoute(new GetStudent(new StudentRepository(pool))))
  router.post('/students', adaptRoute(new CreateStudent(new StudentRepository(pool))))
  router.get('/students/:id/subjects', adaptRoute(new GetStudentSubjects(new StudentRepository(pool))))
  router.get('/students/:id/historic', adaptRoute(new GetStudentHistoric(new StudentRepository(pool))))
  router.get('/students', adaptRoute(new GetAllStudents(new StudentRepository(pool))))
}
