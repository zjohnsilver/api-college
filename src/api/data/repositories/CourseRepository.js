import {
  getOne, getMultiple
} from '@services'

export class CourseRepository {
  constructor (pool) {
    this.pool = pool
  }

  async addStudentToCourse (studentID, courseID) {
    return getOne(this.pool, queryAddStudentToCourse, [studentID, courseID])
  }

  async getCourseSubjects (courseID) {
    return getMultiple(this.pool, queryGetCourseSubjects, [courseID])
  }

  async getCourseTeachers (courseID) {
    return getMultiple(this.pool, queryGetCourseTeachers, [courseID])
  }

  async getCourseTeacher (courseID, matriculation) {
    return getOne(this.pool, queryGetCourseTeacher, [courseID, matriculation])
  }
}

const queryAddStudentToCourse = `
  INSERT INTO manage."student_course"
    (student_id, course_id)
  VALUES
    ($1, $2)
  RETURNING *
`
const queryGetCourseSubjects = `
  SELECT 
    "subject".id,
    "subject".name,
    "course_subject".semester
  FROM manage.course_subject
  LEFT JOIN manage."subject" ON "subject".id = course_subject.subject_id
  WHERE course_id = $1
`
const queryGetCourseTeachers = `
  SELECT
    "teacher".matriculation,
    "teacher".name,
    "teacher".email,
    "teacher".birth_day
  FROM manage.course_teacher
  LEFT JOIN manage."teacher" ON "teacher".id = course_teacher.teacher_id
  WHERE "course_teacher".course_id = $1
  ORDER BY "teacher".matriculation
`

const queryGetCourseTeacher = `
  SELECT
    "teacher".matriculation,
    "teacher".name,
    "teacher".email,
    "teacher".birth_day
  FROM manage.course_teacher
  LEFT JOIN manage."teacher" ON "teacher".id = course_teacher.teacher_id
  WHERE "course_teacher".course_id = $1
    AND "teacher".matriculation = $2
`
