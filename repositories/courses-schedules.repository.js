import BaseRepository from './base.repository.js';

export default class CoursesSchedulesRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'courses_schedules',
      modelName: 'course_schedule',
      columns: ['id', 'course_id', 'teacher_id', 'classroom_id', 'start_date', 'end_date', 'active'],
      searchCriteria: {}
    });
  }
}
