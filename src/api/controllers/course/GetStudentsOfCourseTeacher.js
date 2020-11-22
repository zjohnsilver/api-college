import { ok } from '@api/helpers/http/http-helper'
import env from '@config/env'

export class GetStudentsOfCourseTeacher {
  constructor (repository) {
    this.repository = repository
  }

  async handle (httpRequest) {
    const { id: courseID, matriculation: teacherMatriculation } = httpRequest.params
    const students = await this.repository.getStudentsOfCourseTeacher(courseID, teacherMatriculation)

    const addLinkToStudents = students.map(student => (
      {
        ...student,
        links: [
          {
            type: 'GET',
            rel: 'self',
            uri: `${env.host}/api/courses/${courseID}/students/${student.matriculation}`
          }
        ]
      }
    ))

    return ok({ students: addLinkToStudents })
  }
}
