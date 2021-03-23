import { ok } from '@api/helpers/http/http-helper'

import env from '@config/env'

export class GetAllStudents {
  constructor (repository) {
    this.repository = repository
  }

  async handle () {
    const students = await this.repository.getAll()

    const addLinksToStudents = students.map(student => (
      {
        ...student,
        links: [
          {
            type: 'GET',
            rel: 'self',
            uri: `${env.host}/api/students/${student.matriculation}`
          },
          {
            type: 'GET',
            rel: 'subjects',
            uri: `${env.host}/api/students/${student.matriculation}/subjects`
          }
        ]
      }
    ))

    return ok({ students: addLinksToStudents })
  }
}
