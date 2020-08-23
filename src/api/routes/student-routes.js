import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GetStudentController,
  GetAllStudentsController
} from '@api/controllers/student'
import { StudentRepository } from '@api/data/repositories'

export default (router) => {
  router.get('/students/:id', adaptRoute(new GetStudentController(new StudentRepository())))
  router.get('/students', adaptRoute(new GetAllStudentsController(new StudentRepository())))
}
