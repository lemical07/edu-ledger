import BaseRepository from './base.repository.js';

export default class TopicsRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'topics',
      modelName: 'topic',
      columns: ['id', 'course_id', 'code', 'title', 'description', 'active'],
      searchCriteria: {
        code: {
          sql: 'SELECT * FROM topics WHERE code = ?',
          transform: (value) => value
        }
      }
    });
  }
}
