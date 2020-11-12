import { ok } from '@api/helpers/http/http-helper'
import { serverError } from '@helpers/errors'

export class CreateStudent {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    try{
      const { matriculation, name, email, birth_day, started_in } = httpRequest.body

      await this.repository.createStudent({ matriculation, name, email, birth_day, started_in })

      return ok(`Sucessfully created student ${name}`)
    }
    catch(err){
      return serverError(err.message)
    }
  }
}
