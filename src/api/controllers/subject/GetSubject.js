import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetSubject {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { subject_id } = httpRequest.params
    const subject = await this.repository.getSubject(subject_id)

    const addLinksToSubject = {
      ...subject,
      links: [
        {
          type: 'GET',
          rel: 'self',
          uri: `${env.host}/api/subjects/${subject_id}`
        },
        {
          type: 'GET',
          rel: 'dependencies',
          uri: `${env.host}/api/subjects/${subject_id}/dependencies`
        }
      ]
    }

    return ok({ subject: addLinksToSubject })
  }
}
