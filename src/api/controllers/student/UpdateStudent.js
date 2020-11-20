import { ok } from '@api/helpers/http/http-helper'
import { serverError } from '@helpers/errors'

export class UpdateStudent {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    try {
      const { matriculation } = httpRequest.params
      const { name, email, birth_day, started_in } = httpRequest.body

      const paramsToUpdate = {
        name, email, birth_day, started_in
      }

      const student = await this.repository.updateStudent(matriculation, paramsToUpdate)

      return ok(`Sucessfully update student ${student.name}`)
    } catch (err) {
      return serverError(err.message)
    }
  }
}
