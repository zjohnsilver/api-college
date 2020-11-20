import {
  getOne
} from '@services'

export class CourseRepository {
  constructor (pool) {
    this.pool = pool
  }

  async addStudentToCourse (studentID, courseID) {
    return getOne(this.pool, queryAddStudentToCourse, [studentID, courseID])
  }
}

const queryAddStudentToCourse = `
  INSERT INTO manage."student_course"
    (student_id, course_id)
  VALUES
    ($1, $2)
  RETURNING *
`
