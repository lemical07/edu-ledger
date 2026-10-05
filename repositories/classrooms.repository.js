import BaseRepository from './base.repository.js';

export default class ClassroomsRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'classrooms',
      modelName: 'classroom',
      columns: ['id', 'code', 'description', 'capacity', 'active'],
      searchCriteria: {
        code: {
          sql: 'SELECT * FROM classrooms WHERE code = ?',
          transform: (value) => value
        }
      }
    });
  }
}
