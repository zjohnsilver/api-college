import { ok } from '@api/helpers/http/http-helper'

export class GetStudentSubjects {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const id = httpRequest.params.id
    const subjects = await this.repository.getSubjects(id)
    return ok(subjects)
  }
}
