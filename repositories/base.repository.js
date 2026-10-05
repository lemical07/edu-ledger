import ModelFactory from '../factories/model.factory.js';

export default class BaseRepository {
  constructor(pool, { tableName, modelName, columns, searchCriteria = {} }) {
    this.pool = pool;
    this.tableName = tableName;
    this.modelName = modelName;
    this.columns = columns;
    this.searchCriteria = searchCriteria;
  }

  #crearModelo(fila) {
    const modelo = ModelFactory.crear(this.modelName);

    for (const columna of this.columns) {
      modelo[columna] = fila[columna];
    }

    return modelo;
  }

  async findAll() {
    const [filas] = await this.pool.execute(`SELECT * FROM ${this.tableName}`);
    return filas.map((fila) => this.#crearModelo(fila));
  }

  async findById(id) {
    const [filas] = await this.pool.execute(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    return filas.length ? this.#crearModelo(filas[0]) : null;
  }

  async search(criteria, value) {
    const consulta = this.searchCriteria[criteria];

    if (!consulta) {
      throw new Error(`Criterio de búsqueda no permitido: ${criteria}`);
    }

    const [filas] = await this.pool.execute(consulta.sql, [consulta.transform(value)]);
    return filas.map((fila) => this.#crearModelo(fila));
  }

  async insert(datos) {
    const columnas = this.columns.filter((columna) => datos[columna] !== undefined);
    const valores = columnas.map((columna) => datos[columna]);
    const placeholders = columnas.map(() => '?').join(', ');

    const [resultado] = await this.pool.execute(
      `INSERT INTO ${this.tableName} (${columnas.join(', ')}) VALUES (${placeholders})`,
      valores
    );

    return this.findById(resultado.insertId);
  }

  async updateField(id, campo, valor) {
    if (!this.columns.includes(campo) || campo === 'id') {
      throw new Error(`Campo no permitido para actualización: ${campo}`);
    }

    await this.pool.execute(
      `UPDATE ${this.tableName} SET ${campo} = ? WHERE id = ?`,
      [valor, id]
    );

    return this.findById(id);
  }

  async delete(id) {
    const [resultado] = await this.pool.execute(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    return resultado.affectedRows > 0;
  }
}
