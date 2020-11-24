import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetTeacherSubjects {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID, matriculation: teacherMatriculation } = httpRequest.params
    const subjects = await this.repository.getTeacherSubjects(courseID, teacherMatriculation)

    const addLinkToSubjects = subjects.map(subject => (
      {
        ...subject,
        links: [
          {
            type: 'GET',
            rel: 'self',
            uri: `${env.host}/api/courses/${courseID}/subjects/${subject.id}`
          },
          {
            type: 'GET',
            rel: 'dependencies',
            uri: `${env.host}/api/courses/${courseID}/subjects/${subject.id}/dependencies`
          }
        ]
      }
    ))

    return ok({ subjects: addLinkToSubjects })
  }
}
