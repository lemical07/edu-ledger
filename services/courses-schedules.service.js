import BaseService from './base.service.js';

export default class CoursesSchedulesService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'horario de curso',
      criteriosBusqueda: ['id'],
      campos: {
        id: { type: 'integer' },
        course_id: { type: 'integer', min: 1 },
        teacher_id: { type: 'integer', min: 1 },
        classroom_id: { type: 'integer', min: 1 },
        start_date: { type: 'date' },
        end_date: { type: 'date' },
        active: { type: 'integer', min: 0, max: 1 }
      }
    });
  }
}
