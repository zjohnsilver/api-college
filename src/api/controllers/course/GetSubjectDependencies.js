import { ok } from '@api/helpers/http/http-helper'

export class GetSubjectDependencies {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { subject_id } = httpRequest.params
    const dependencies = await this.repository.getDependencies(subject_id)

    return ok({ dependencies })
  }
}
