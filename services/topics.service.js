import BaseService from './base.service.js';

export default class TopicsService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'tema',
      criteriosBusqueda: ['code'],
      campos: {
        id: { type: 'integer' },
        course_id: { type: 'integer', min: 1 },
        code: { type: 'string', maxLength: 10 },
        title: { type: 'string', maxLength: 100 },
        description: { type: 'string', maxLength: 250, nullable: true },
        active: { type: 'integer', min: 0, max: 1 }
      }
    });
  }
}
