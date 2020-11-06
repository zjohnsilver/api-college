import { ok } from '@api/helpers/http/http-helper'

export class GetStudentHistoric {
  constructor (repository, ) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: student_id } = httpRequest.params
    const historicData = await this.repository.getHistoricData(student_id)

    return ok({historic: historicData})
  }
}
