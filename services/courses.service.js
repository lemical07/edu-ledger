import BaseService from './base.service.js';

export default class CoursesService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'curso',
      criteriosBusqueda: ['code'],
      campos: {
        id: { type: 'integer' },
        code: { type: 'string', maxLength: 10 },
        description: { type: 'string', maxLength: 250, nullable: true },
        intensity: { type: 'integer', min: 0 },
        weight: { type: 'integer', min: 0 },
        active: { type: 'integer', min: 0, max: 1 }
      }
    });
  }
}
