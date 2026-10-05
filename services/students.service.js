import BaseService from './base.service.js';

export default class StudentsService extends BaseService {
  constructor(repository) {
    super(repository, {
      nombre: 'estudiante',
      criteriosBusqueda: ['identificationNumber', 'fullName'],
      campos: {
        id: { type: 'integer' },
        code: { type: 'string', maxLength: 14 },
        firstName: { type: 'string', maxLength: 60 },
        lastName: { type: 'string', maxLength: 60 },
        identification_type_id: { type: 'integer', min: 1 },
        identificationNumber: { type: 'string', maxLength: 16 },
        gender: { type: 'string', maxLength: 20 },
        birthdate: { type: 'date' },
        email: { type: 'string', maxLength: 60, nullable: true, email: true },
        address: { type: 'string', maxLength: 100, nullable: true },
        city_id: { type: 'integer', min: 1 }
      }
    });
  }
}
