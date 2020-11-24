import {
  getOne, getMultiple
} from '@services'

export class SubjectRepository {
  constructor (pool) {
    this.pool = pool
  }

  async getDependencies (subjectID) {
    return getMultiple(this.pool, queryGetDependenciesBySubject, [subjectID])
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
  WHERE "prerequisites".subject_id = $1
`
const queryGetSubject = `
  SELECT
    id,
    name
  FROM manage."subject"
  WHERE id = $1
`
