import { ok } from '@api/helpers/http/http-helper'

export class GetAllStudentsController {
  constructor (repository) {
    this.repository = repository
  }

  async handle () {
    const students = await this.repository.getAll()
    return ok(students)
  }
}
