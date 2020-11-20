import { ok } from '@api/helpers/http/http-helper'
import { serverError } from '@helpers/errors'

export class DeleteStudent {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    try {
      const { matriculation } = httpRequest.params

      const student = await this.repository.deleteStudent(matriculation)

      return ok(`Sucessfully delete student ${student?.name}`)
    } catch (err) {
      return serverError(err.message)
    }
  }
}
