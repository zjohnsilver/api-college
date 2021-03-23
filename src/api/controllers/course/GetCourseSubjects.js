import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetCourseSubjects {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID } = httpRequest.params
    const subjects = await this.repository.getCourseSubjects(courseID)

    const addLinkToSubjects = subjects.map(subject => (
      {
        ...subject,
        workload: {
          value: subject.workload,
          unit: 'h'
        },
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

    const subjectsGroupBySemester = addLinkToSubjects.reduce((acc, curr) => {
      const key = `Semester ${curr.semester}`
      return {
        ...acc,
        ...(acc[key])
          ? acc[key].push(curr)
          : { [key]: [curr] }
      }
    }, {})

    return ok({ subjects: subjectsGroupBySemester })
  }
}
