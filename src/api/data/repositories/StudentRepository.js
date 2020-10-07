import {
  getOne, getMultiple
} from '@services'

export class StudentRepository {
  constructor (pool) {
    this.pool = pool
  }

  async get (id) {
    return getOne(this.pool, queryGetStudentByID, [id])
  }

  async getAll () {
    return getMultiple(this.pool, queryGetAllStudents)
  }

  async getSubjects (id) {
    return getMultiple(this.pool, queryGetStudentSubjects, [id])
  }
}

const queryGetStudentByID = `
  SELECT 
    id, 
    matriculation,
    name,
    email,
    birth_day,
    started_in 
  FROM manage.student WHERE matriculation=$1
`

const queryGetAllStudents = `
  SELECT 
    id, 
    matriculation,
    name,
    email,
    birth_day,
    started_in 
  FROM manage.student
`

const queryGetStudentSubjects = `
  SELECT 
    subject.id, 
    subject.name 
  FROM manage."class"
  LEFT JOIN manage.subject ON "class".subject_id = subject.id 
  LEFT JOIN manage.student ON "student".id = "class".student_id
  WHERE student.matriculation = $1
`