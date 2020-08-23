export class StudentRepository {
  async get (id) {
    return {
      id: id,
      name: 'John'
    }
  }

  async getAll () {
    return [
      {
        id: '20151045050465',
        name: 'John'
      }
    ]
  }
}
