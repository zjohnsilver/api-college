import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetCourseSubject {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { course_id, subject_id } = httpRequest.params

    const subject = await this.repository.getCourseSubject(course_id, subject_id)

    const addLinkToSubject = {
      ...subject,
      links: [
        {
          type: 'GET',
          rel: 'self',
          uri: `${env.host}/api/courses/${course_id}/subjects/${subject_id}`
        },
        {
          type: 'GET',
          rel: 'dependencies',
          uri: `${env.host}/api/courses/${course_id}/subjects/${subject_id}/dependencies`
        }
      ]
    }

    return ok({ subject: addLinkToSubject })
  }
}
