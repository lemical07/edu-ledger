import BaseService from './base.service.js';

export default class RatesService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'calificación',
      criteriosBusqueda: ['id'],
      campos: {
        id: { type: 'integer' },
        inscription_id: { type: 'integer', min: 1 },
        rate: { type: 'integer' },
        comments: { type: 'string', maxLength: 250, nullable: true }
      }
    });
  }
}
