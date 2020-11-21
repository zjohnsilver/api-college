import { ok } from '@api/helpers/http/http-helper'

export class GetCourseSubjects {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID } = httpRequest.params
    const subjects = await this.repository.getCourseSubjects(courseID)

    const subjectsGroupBySemester = subjects.reduce((acc, curr) => {
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
