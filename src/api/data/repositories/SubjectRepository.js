import {
  getOne, getMultiple
} from '@services'

export class SubjectRepository {
  constructor (pool) {
    this.pool = pool
  }

  async getDependencies (courseID, subjectID) {
    console.log('Oi')
    return getMultiple(this.pool, queryGetDependenciesBySubject, [courseID, subjectID])
  }

  async getSubject (subjectID) {
    return getOne(this.pool, queryGetSubject, [subjectID])
  }
}

const queryGetDependenciesBySubject = `
  SELECT 
    "subject".id,
    "subject".name
  FROM manage."prerequisites"
  LEFT JOIN manage."subject" ON "subject".id = "prerequisites".prerequisite_id
  WHERE "prerequisites".course_id = $1
    AND "prerequisites".subject_id = $2
`
const queryGetSubject = `
  SELECT
    id,
    name
  FROM manage."subject"
  WHERE id = $1
`
