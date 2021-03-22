import { ok } from '@api/helpers/http/http-helper'
// import env from '@config/env'

import faker from 'faker'

export class GenerateFakeStudents {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { course_id, amount } = httpRequest.body

    const students = []

    for (let index = 0; index < amount; index++) {
      students.push(
        {
          name: faker.name.findName(),
          email: faker.internet.email(),
          birth_day: faker.date.between('1994-01-01', '2003-01-01'),
          started_in: faker.date.between('2021-01-01', '2022-01-01')
        }
      )
    }
    const createdStudents = await this.repository.createStudents(students)

    const createdStudentMatriculations = createdStudents.map(s => s.matriculation)

    await this.repository.addStudentsToCourse(course_id, createdStudentMatriculations)

    return ok(students)
  }
}
