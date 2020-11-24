import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetSubjectDependencies {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { course_id, subject_id } = httpRequest.params
    const dependencies = await this.repository.getDependencies(course_id, subject_id)

    const addLinkToDependencies = dependencies.map(dependency => (
      {
        ...dependency,
        links: [
          {
            type: 'GET',
            rel: 'self',
            uri: `${env.host}/api/courses/${course_id}/subjects/${dependency.id}`
          },
          {
            type: 'GET',
            rel: 'dependencies',
            uri: `${env.host}/api/courses/${course_id}/subjects/${dependency.id}/dependencies`
          }
        ]
      }
    ))

    return ok({ dependencies: addLinkToDependencies })
  }
}
