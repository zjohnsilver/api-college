import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GetStudentsByCourse,
  GetCourseSubjects,
  GetCourseTeachers,
  GetCourseTeacher
} from '@controllers/course'
import { StudentRepository, CourseRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.get('/courses/:id/students', adaptRoute(new GetStudentsByCourse(new StudentRepository(pool))))
  router.get('/courses/:id/subjects', adaptRoute(new GetCourseSubjects(new CourseRepository(pool))))
  router.get('/courses/:id/teachers', adaptRoute(new GetCourseTeachers(new CourseRepository(pool))))
  router.get('/courses/:id/teachers/:matriculation', adaptRoute(new GetCourseTeacher(new CourseRepository(pool))))
}
