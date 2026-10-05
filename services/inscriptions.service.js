import BaseService from './base.service.js';

export default class InscriptionsService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'inscripción',
      criteriosBusqueda: ['id'],
      campos: {
        id: { type: 'integer' },
        course_schedule: { type: 'integer', min: 1 },
        student_id: { type: 'integer', min: 1 },
        register_date: { type: 'date' },
        active: { type: 'integer', min: 0, max: 1 }
      }
    });
  }
}
