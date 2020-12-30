import { ok } from '@api/helpers/http/http-helper'
// import env from '@config/env'
import generateData from '@helpers/generate-data'

export class GenerateFakeStudents {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { course_id, number } = httpRequest.body

    const students = []

    for (let index = 0; index < number; index++) {
      students.push(
        {
          name: generateData.name.findName(),
          matriculation: 20000000000,
          email: generateData.internet.email(),
          birth_day: generateData.date.between('1994-01-01', '2003-01-01')
        }
      )
    }

    console.log(course_id, number)

    return ok(students)
  }
}
