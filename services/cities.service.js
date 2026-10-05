import BaseService from './base.service.js';

export default class CitiesService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'ciudad',
      criteriosBusqueda: ['code'],
      campos: {
        id: { type: 'integer' },
        code: { type: 'string', maxLength: 10 },
        name: { type: 'string', maxLength: 100 }
      }
    });
  }
}
