import BaseRepository from './base.repository.js';

export default class RatesRepository extends BaseRepository {
  constructor(pool) {
    super(pool, {
      tableName: 'rates',
      modelName: 'rate',
      columns: ['id', 'inscription_id', 'rate', 'comments'],
      searchCriteria: {}
    });
  }
}
