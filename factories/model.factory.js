import IdentificationType from '../models/identification-types.model.js';
import City from '../models/cities.model.js';
import Student from '../models/students.model.js';
import Teacher from '../models/teachers.model.js';
import Classroom from '../models/classrooms.model.js';
import Course from '../models/courses.model.js';
import Topic from '../models/topics.model.js';
import CourseSchedule from '../models/courses-schedules.model.js';
import Inscription from '../models/inscriptions.model.js';
import Rate from '../models/rates.model.js';

export default class ModelFactory {
  static #models = new Map([
    ['identification_type', IdentificationType],
    ['city', City],
    ['student', Student],
    ['teacher', Teacher],
    ['classroom', Classroom],
    ['course', Course],
    ['topic', Topic],
    ['course_schedule', CourseSchedule],
    ['inscription', Inscription],
    ['rate', Rate]
  ]);

  static crear(modelName) {
    const Model = this.#models.get(modelName);

    if (!Model) {
      throw new Error(`Modelo no registrado: ${modelName}`);
    }

    return new Model();
  }
}
