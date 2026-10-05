import BaseService from './base.service.js';

export default class ClassroomsService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'aula',
      criteriosBusqueda: ['code'],
      campos: {
        id: { type: 'integer' },
        code: { type: 'string', maxLength: 10 },
        description: { type: 'string', maxLength: 250, nullable: true },
        capacity: { type: 'integer', min: 0 },
        active: { type: 'integer', min: 0, max: 1 }
      }
    });
  }
}
