export default class BaseService {
  constructor(repository, { nombre, campos, criteriosBusqueda }) {
    this.repository = repository;
    this.nombre = nombre;
    this.campos = campos;
    this.criteriosBusqueda = criteriosBusqueda;
  }

  obtenerCampos() {
    return this.campos;
  }

  obtenerCriteriosBusqueda() {
    return this.criteriosBusqueda;
  }

  async listar() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw this.#traducirError(error);
    }
  }

  async buscar(criterio, valor) {
    if (valor === undefined || valor === null || String(valor).trim() === '') {
      throw new Error('El criterio de búsqueda es obligatorio.');
    }

    try {
      if (criterio === 'id') {
        const registro = await this.repository.findById(this.#entero(valor, 'ID'));
        return registro ? [registro] : [];
      }

      return await this.repository.search(criterio, String(valor).trim());
    } catch (error) {
      throw this.#traducirError(error);
    }
  }

  async crear(datos) {
    const normalizados = this.#validarDatos(datos, false);

    try {
      return await this.repository.insert(normalizados);
    } catch (error) {
      throw this.#traducirError(error);
    }
  }

  async actualizarCampo(id, campo, valor) {
    const registroId = this.#entero(id, 'ID');
    const definicion = this.campos[campo];

    if (!definicion || campo === 'id') {
      throw new Error(`El campo '${campo}' no puede actualizarse.`);
    }

    const normalizado = this.#validarCampo(campo, valor, definicion);

    try {
      const existente = await this.repository.findById(registroId);

      if (!existente) {
        throw new Error(`No existe un registro de ${this.nombre} con ID ${registroId}.`);
      }

      return await this.repository.updateField(registroId, campo, normalizado);
    } catch (error) {
      throw this.#traducirError(error);
    }
  }

  async eliminar(id) {
    const registroId = this.#entero(id, 'ID');

    try {
      const existente = await this.repository.findById(registroId);

      if (!existente) {
        throw new Error(`No existe un registro de ${this.nombre} con ID ${registroId}.`);
      }

      await this.repository.delete(registroId);
      return existente;
    } catch (error) {
      throw this.#traducirError(error);
    }
  }

  #validarDatos(datos, incluirId) {
    const resultado = {};

    for (const [campo, definicion] of Object.entries(this.campos)) {
      if (campo === 'id' && !incluirId) continue;

      const valor = datos[campo];
      resultado[campo] = this.#validarCampo(campo, valor, definicion);
    }

    return resultado;
  }

  #validarCampo(campo, valor, definicion) {
    const vacio = valor === undefined || valor === null || String(valor).trim() === '';

    if (vacio) {
      if (definicion.nullable) return null;
      throw new Error(`El campo '${campo}' es obligatorio.`);
    }

    if (definicion.type === 'string') {
      const texto = String(valor).trim();

      if (definicion.maxLength && texto.length > definicion.maxLength) {
        throw new Error(`El campo '${campo}' no puede superar ${definicion.maxLength} caracteres.`);
      }

      if (definicion.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) {
        throw new Error(`El campo '${campo}' debe contener un correo válido.`);
      }

      return texto;
    }

    if (definicion.type === 'integer') {
      const numero = Number(valor);

      if (!Number.isInteger(numero)) {
        throw new Error(`El campo '${campo}' debe ser un entero.`);
      }

      if (definicion.min !== undefined && numero < definicion.min) {
        throw new Error(`El campo '${campo}' debe ser mayor o igual a ${definicion.min}.`);
      }

      if (definicion.max !== undefined && numero > definicion.max) {
        throw new Error(`El campo '${campo}' debe ser menor o igual a ${definicion.max}.`);
      }

      return numero;
    }

    if (definicion.type === 'date') {
      const fecha = new Date(String(valor).replace(' ', 'T'));

      if (Number.isNaN(fecha.getTime())) {
        throw new Error(`El campo '${campo}' debe contener una fecha válida.`);
      }

      return String(valor).trim();
    }

    throw new Error(`Tipo de validación no soportado para '${campo}'.`);
  }

  #entero(valor, nombre) {
    const numero = Number(valor);

    if (!Number.isInteger(numero) || numero <= 0) {
      throw new Error(`${nombre} debe ser un entero positivo.`);
    }

    return numero;
  }

  #traducirError(error) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return new Error(`No se pudo guardar ${this.nombre}: el registro ya existe.`);
    }

    if (error?.code === 'ER_NO_REFERENCED_ROW_2') {
      return new Error(`No se pudo guardar ${this.nombre}: una clave foránea no existe.`);
    }

    if (error?.code === 'ER_ROW_IS_REFERENCED_2') {
      return new Error(`No se puede eliminar ${this.nombre}: el registro está siendo utilizado por otro registro.`);
    }

    if (error?.code === 'ER_DATA_TOO_LONG') {
      return new Error(`No se pudo guardar ${this.nombre}: uno de los valores supera la longitud permitida.`);
    }

    if (error?.code === 'ER_BAD_NULL_ERROR') {
      return new Error(`No se pudo guardar ${this.nombre}: falta un valor obligatorio.`);
    }

    if (error?.code === 'ER_TRUNCATED_WRONG_VALUE') {
      return new Error(`No se pudo guardar ${this.nombre}: uno de los valores tiene un formato inválido.`);
    }

    return error;
  }
}