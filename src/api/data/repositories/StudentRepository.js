export class StudentRepository {
  constructor (pool) {
    this.pool = pool
  }

  async get (id) {
    return await this.pool.query('SELECT * FROM manage.student WHERE matriculation=$1', [id])
      .then(({ rows }) => {
        console.log(rows[0])
        return rows[0] || {}
      })
      .catch(e => {
        console.log(e)
      })
  }

  async getAll () {
    return await this.pool.query('SELECT * FROM manage.student')
      .then(({ rows }) => {
        return rows || []
      })
      .catch(e => {
        console.log(e)
      })
  }
}
