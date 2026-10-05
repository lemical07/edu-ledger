import BaseService from './base.service.js';

export default class TeachersService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'maestro',
      criteriosBusqueda: ['identificationNumber', 'fullName'],
      campos: {
        id: { type: 'integer' },
        firstName: { type: 'string', maxLength: 60 },
        lastName: { type: 'string', maxLength: 60 },
        identification_type_id: { type: 'integer', min: 1 },
        identificationNumber: { type: 'string', maxLength: 16 },
        email: { type: 'string', maxLength: 100, email: true }
      }
    });
  }
}
