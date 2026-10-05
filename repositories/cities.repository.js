import BaseRepository from './base.repository.js';

export default class CitiesRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'cities',
      modelName: 'city',
      columns: ['id', 'code', 'name'],
      searchCriteria: {
        code: {
          sql: 'SELECT * FROM cities WHERE code = ?',
          transform: (value) => value
        }
      }
    });
  }
}
