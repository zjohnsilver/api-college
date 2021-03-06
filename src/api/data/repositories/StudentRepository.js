import {
  getOne, getMultiple
} from '@db/models'

export class StudentRepository {
  constructor (pool) {
    this.pool = pool
  }

  async get (matriculation) {
    return getOne(this.pool, queryGetStudent, [matriculation])
  }

  async getAll () {
    return getMultiple(this.pool, queryGetAllStudents)
  }

  async getSubjects (id) {
    return getMultiple(this.pool, queryGetStudentSubjects, [id])
  }

  async getHistoricData (studentID) {
    return getMultiple(this.pool, queryGetHistoricData, [studentID])
  }

  async getStudentsByCourse (courseID) {
    return getMultiple(this.pool, queryGetStudentsByCourse, [courseID])
  }

  async createStudent (params) {
    const { name, email, birth_day, started_in } = params
    return getOne(this.pool, queryCreateStudent, [name, email, birth_day, started_in])
  }

  async createStudents (students) {
    const promises = students.map(student => {
      return getOne(this.pool, queryCreateStudent, [student.name, student.email, student.birth_day, student.started_in])
    })

    return Promise.all(promises)
  }

  async addStudentsToCourse (courseId, student_matriculations) {
    const promises = student_matriculations.map(student_matriculation => {
      return getOne(this.pool, queryAddStudentToCourse, [student_matriculation, courseId])
    })

    return Promise.all(promises)
  }

  async updateStudent (matriculation, params) {
    const paramsKeys = Object.keys(params)

    const queryUpdateStudent = `
      UPDATE manage."student"
        SET ${paramsKeys.filter(param => params[param]).map(param => `${param} = '${params[param]}'`).join(',\n')}
      WHERE matriculation = '${matriculation}'
      RETURNING *
    `

    return getOne(this.pool, queryUpdateStudent)
  }

  async deleteStudent (matriculation) {
    return getOne(this.pool, queryDeleteStudent, [matriculation])
  }
}

const queryGetStudent = `
  SELECT 
    matriculation,
    name,
    email,
    birth_day,
    started_in 
  FROM manage.student WHERE matriculation=$1
`

const queryGetAllStudents = `
  SELECT
    jsonb_build_object('id', course.id, 'name', course.name) as course,
    student.matriculation,
    student.name,
    student.email,
    student.birth_day,
    student.started_in 
  FROM manage.student
  LEFT JOIN manage."student_course" ON student_course.student_matriculation = student.matriculation
  LEFT JOIN manage.course ON course.id = student_course.course_id
`

const queryGetStudentsByCourse = `
  SELECT  
    "student".matriculation,
    "student".name,
    "student".email,
    "student".birth_day,
    "student".started_in 
  FROM manage.student_course
  LEFT JOIN manage."student" ON "student".matriculation = student_course.student_matriculation
  WHERE student_course.course_id = $1
  ORDER BY matriculation
`

const queryGetStudentSubjects = `
  SELECT 
    subject.id, 
    subject.name 
  FROM manage."class"
  LEFT JOIN manage.subject ON "class".subject_id = subject.id 
  LEFT JOIN manage.student ON "student".matriculation = "class".student_matriculation
  WHERE student.matriculation = $1
`

const queryGetHistoricData = `
  SELECT 
    "subject".name AS name,
    "teacher".name AS teacher_name,
    "historic".note,
    "historic".approved,
    "historic".frequency,
    "historic".start_time,
    "historic".end_time
  FROM manage."historic"
  LEFT JOIN manage."subject" ON "subject".id = "historic".subject_id
  LEFT JOIN manage."teacher" ON "teacher".id = "historic".teacher_id
  LEFT JOIN manage."student" ON "student".matriculation = "historic".student_matriculation
  WHERE "student".matriculation = $1
`

const queryCreateStudent = `
  INSERT INTO manage."student"
    (name, email, birth_day, started_in)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
`
const queryDeleteStudent = `
  DELETE FROM manage."student"
  WHERE matriculation = $1
  RETURNING *
`

const queryAddStudentToCourse = `
  INSERT INTO manage.student_course
    ("student_matriculation", "course_id")
  VALUES
    ($1, $2)
`
