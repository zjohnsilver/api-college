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
