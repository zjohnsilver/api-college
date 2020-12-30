import {
  getMultiple
} from '@services'

export class FakerRepository {
  constructor (pool) {
    this.pool = pool
  }

  async createStudents () {
    return getMultiple()
  }
}
