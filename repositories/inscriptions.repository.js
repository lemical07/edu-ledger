import BaseRepository from './base.repository.js';

export default class InscriptionsRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'inscriptions',
      modelName: 'inscription',
      columns: ['id', 'course_schedule', 'student_id', 'register_date', 'active'],
      searchCriteria: {}
    });
  }
}
