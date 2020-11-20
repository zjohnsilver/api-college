import { ok } from '@api/helpers/http/http-helper'
import { serverError, paramError } from '@helpers/errors'

export class CreateStudent {
  constructor (studentRepository, courseRepository) {
    this.studentRepository = studentRepository
    this.courseRepository = courseRepository
  }

  async handle (httpRequest) {
    try {
      const { matriculation, name, email, birth_day, started_in, course_id } = httpRequest.body

      if (!course_id) {
        return paramError('You forgot to insert the course_id of student')
      }

      const student = await this.studentRepository.createStudent({ matriculation, name, email, birth_day, started_in })

      await this.courseRepository.addStudentToCourse(student.id, course_id)

      return ok(`Sucessfully created student ${student.name}`)
    } catch (err) {
      return serverError(err.message)
    }
  }
}
