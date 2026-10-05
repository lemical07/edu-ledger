import BaseRepository from './base.repository.js';

export default class TeachersRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'teachers',
      modelName: 'teacher',
      columns: ['id', 'firstName', 'lastName', 'identification_type_id', 'identificationNumber', 'email'],
      searchCriteria: {
        identificationNumber: {
          sql: 'SELECT * FROM teachers WHERE identificationNumber = ?',
          transform: (value) => value
        },
        fullName: {
          sql: `SELECT * FROM teachers
                WHERE CONCAT(firstName, ' ', lastName) LIKE ?`,
          transform: (value) => `%${value}%`
        }
      }
    });
  }
}
