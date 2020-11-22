import {
  getMultiple, getOne
} from '@services'

export class TeacherRepository {
  constructor (pool) {
    this.pool = pool
  }

  async getTeachers (subjectID) {
    if (subjectID) {
      return await getMultiple(this.pool, queryGetTeachersBySubjects, [subjectID])
    } else {
      return await getMultiple(this.pool, queryGetTeachers)
    }
  }

  async getTeacher (teacherID) {
    return await getOne(this.pool, queryGetTeacher, [teacherID])
  }
}

const queryGetTeachersBySubjects = `
  SELECT
    "teacher".matriculation,
    "teacher".name,
    "teacher".email,
    "teacher".birth_day
  FROM manage."class"
  LEFT JOIN manage."teacher" ON "teacher".id = "class".teacher_id
  WHERE "class".subject_id = $1
`

const queryGetTeachers = `
  SELECT
    matriculation,
    name,
    email,
    birth_day
  FROM manage."teacher"
`

const queryGetTeacher = `
  SELECT
    matriculation,
    name,
    email,
    birth_day
  FROM manage."teacher"
  WHERE "teacher".matriculation = $1
`
