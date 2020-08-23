import { ok } from '@api/helpers/http/http-helper'

export class GetStudentController {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const id = httpRequest.params.id
    const student = await this.repository.get(id)
    return ok(student)
  }
}
