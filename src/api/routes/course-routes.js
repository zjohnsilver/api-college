import { adaptRoute } from '@api/adapters/express-route-adapter'
import {
  GetStudentsByCourse,
  GetCourseSubjects,
  GetTeachersByCourse,
  GetCourseTeacher,
  GetStudentsOfCourseTeacher,
  GetTeacherSubjects,
  GetSubjectDependencies,
  GetCourseSubject
} from '@controllers/course'
import { StudentRepository, CourseRepository, TeacherRepository, SubjectRepository } from '@api/data/repositories'
import { pool } from '@api/data/db'

export default (router) => {
  router.get('/courses/:id/students', adaptRoute(new GetStudentsByCourse(new StudentRepository(pool))))
  router.get('/courses/:id/subjects', adaptRoute(new GetCourseSubjects(new CourseRepository(pool))))
  router.get('/courses/:course_id/subjects/:subject_id', adaptRoute(new GetCourseSubject(new CourseRepository(pool))))
  router.get('/courses/:course_id/subjects/:subject_id/dependencies', adaptRoute(new GetSubjectDependencies(new SubjectRepository(pool))))
  router.get('/courses/:id/teachers', adaptRoute(new GetTeachersByCourse(new TeacherRepository(pool))))
  router.get('/courses/:id/teachers/:matriculation', adaptRoute(new GetCourseTeacher(new CourseRepository(pool))))
  router.get('/courses/:id/teachers/:matriculation/students', adaptRoute(new GetStudentsOfCourseTeacher(new CourseRepository(pool))))
  router.get('/courses/:id/teachers/:matriculation/subjects', adaptRoute(new GetTeacherSubjects(new TeacherRepository(pool))))
}
