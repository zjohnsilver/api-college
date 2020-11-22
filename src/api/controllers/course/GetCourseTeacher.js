import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetCourseTeacher {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID, matriculation } = httpRequest.params
    const teacher = await this.repository.getCourseTeacher(courseID, matriculation)

    const addLinksToTeacher = {
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
        }
      ]
    }

    return ok({ teacher: addLinksToTeacher })
  }
}
