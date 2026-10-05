import BaseRepository from './base.repository.js';

export default class IdentificationTypesRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'identification_types',
      modelName: 'identification_type',
      columns: ['id', 'code', 'name', 'description'],
      searchCriteria: {
        code: {
          sql: 'SELECT * FROM identification_types WHERE code = ?',
          transform: (value) => value
        }
      }
    });
  }
}
