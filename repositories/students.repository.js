import BaseRepository from './base.repository.js';

export default class StudentsRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'students',
      modelName: 'student',
      columns: [
        'id', 'code', 'firstName', 'lastName', 'identification_type_id',
        'identificationNumber', 'gender', 'birthdate', 'email', 'address', 'city_id'
      ],
      searchCriteria: {
        identificationNumber: {
          sql: 'SELECT * FROM students WHERE identificationNumber = ?',
          transform: (value) => value
        },
        fullName: {
          sql: `SELECT * FROM students
                WHERE CONCAT(firstName, ' ', lastName) LIKE ?`,
          transform: (value) => `%${value}%`
        }
      }
    });
  }
}
