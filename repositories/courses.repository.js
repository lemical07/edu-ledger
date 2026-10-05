import BaseRepository from './base.repository.js';

export default class CoursesRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'courses',
      modelName: 'course',
      columns: ['id', 'code', 'description', 'intensity', 'weight', 'active'],
      searchCriteria: {
        code: {
          sql: 'SELECT * FROM courses WHERE code = ?',
          transform: (value) => value
        }
      }
    });
  }
}
