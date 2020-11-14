import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GetStudent,
  GetAllStudents,
  GetStudentSubjects,
  GetStudentHistoric,
  CreateStudent,
  UpdateStudent,
  DeleteStudent
} from '@controllers/student'
import { StudentRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.get('/students', adaptRoute(new GetAllStudents(new StudentRepository(pool))))
  router.post('/students', adaptRoute(new CreateStudent(new StudentRepository(pool))))
  router.get('/students/:id/subjects', adaptRoute(new GetStudentSubjects(new StudentRepository(pool))))
  router.get('/students/:id/historic', adaptRoute(new GetStudentHistoric(new StudentRepository(pool))))
  router.get('/students/:matriculation', adaptRoute(new GetStudent(new StudentRepository(pool))))
  router.put('/students/:matriculation', adaptRoute(new UpdateStudent(new StudentRepository(pool))))
  router.delete('/students/:matriculation', adaptRoute(new DeleteStudent(new StudentRepository(pool))))
}
