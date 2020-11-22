import { ok } from '@api/helpers/http/http-helper'

export class GetTeacherSubjectsByCourse {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID, matriculation: teacherMatriculation } = httpRequest.params
    const subjects = await this.repository.getTeacherSubjectsByCourse(courseID, teacherMatriculation)

    return ok({ subjects })
  }
}
