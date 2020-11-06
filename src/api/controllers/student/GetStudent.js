import { ok } from '@api/helpers/http/http-helper'
import { serverError } from '@helpers/errors'

export class GetStudent {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    try{
      const id = httpRequest.params.id
      const student = await this.repository.get(id)
      return ok(student)
    }
    catch(err){
      return serverError(err.message)
    }
  }
}
