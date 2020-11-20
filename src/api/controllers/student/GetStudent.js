import { ok } from '@api/helpers/http/http-helper'
import { serverError } from '@helpers/errors'

export class GetStudent {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    try {
      const { matriculation } = httpRequest.params
      const student = await this.repository.get(matriculation)
      return ok(student)
    } catch (err) {
      return serverError(err.message)
    }
  }
}
