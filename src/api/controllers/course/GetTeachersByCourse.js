import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetTeachersByCourse {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID } = httpRequest.params
    const teachers = await this.repository.getTeachersByCourse(courseID)

    const addLinkToTeachers = teachers.map(teacher => (
      {
        ...teacher,
        links: [
          {
            type: 'GET',
            rel: 'self',
            uri: `${env.host}/api/courses/${courseID}/teachers/${teacher.matriculation}`
          },
          {
            type: 'GET',
            rel: 'students',
            uri: `${env.host}/api/courses/${courseID}/teachers/${teacher.matriculation}/students`
          },
          {
            type: 'GET',
            rel: 'subjects',
            uri: `${env.host}/api/courses/${courseID}/teachers/${teacher.matriculation}/subjects`
          }
        ]
      }
    ))

    return ok({ teachers: addLinkToTeachers })
  }
}
