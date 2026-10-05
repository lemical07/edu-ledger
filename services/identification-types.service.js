import BaseService from './base.service.js';

export default class IdentificationTypesService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'tipo de identificación',
      criteriosBusqueda: ['code'],
      campos: {
        id: { type: 'integer' },
        code: { type: 'string', maxLength: 6 },
        name: { type: 'string', maxLength: 100 },
        description: { type: 'string', maxLength: 250, nullable: true }
      }
    });
  }
}