import { ok } from '@api/helpers/http/http-helper'

import faker from 'faker'

export class GenerateFakeTeachers {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { course_id, amount } = httpRequest.body

    const teachers = []

    for (let index = 0; index < amount; index++) {
      teachers.push(
        {
          name: faker.name.findName(),
          email: faker.internet.email(),
          birth_day: faker.date.between('1970-01-01', '1984-01-01')
        }
      )
    }
    const createdTeachers = await this.repository.createTeachers(teachers)

    const createdTeacherMatriculations = createdTeachers.map(s => s.matriculation)

    await this.repository.addTeachersToCourse(course_id, createdTeacherMatriculations)

    return ok(teachers)
  }
}
