import { ok } from '@api/helpers/http/http-helper'

export class GetStudentsByCourse {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID } = httpRequest.params
    const students = await this.repository.getStudentsByCourse(courseID)
    return ok({ students: students })
  }
}
