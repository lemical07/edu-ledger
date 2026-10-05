import inquirer from 'inquirer';
import chalk from 'chalk';

export default class CrudCommand {
  constructor(servicio, nombre, nombrePlural) {
    this.servicio = servicio;
    this.nombre = nombre;
    this.nombrePlural = nombrePlural;
  }

  async ejecutar() {
    let continuar = true;

    while (continuar) {
      const { accion } = await inquirer.prompt({
        type: 'list',
        name: 'accion',
        message: `¿Qué deseas hacer con ${this.nombrePlural}?`,
        choices: [
          { name: 'Listar', value: 'listar' },
          { name: 'Buscar', value: 'buscar' },
          { name: 'Crear', value: 'crear' },
          { name: 'Actualizar', value: 'actualizar' },
          { name: 'Eliminar', value: 'eliminar' },
          { name: 'Volver', value: 'volver' }
        ]
      });

      try {
        if (accion === 'listar') await this.listar();
        if (accion === 'buscar') await this.buscar();
        if (accion === 'crear') await this.crear();
        if (accion === 'actualizar') await this.actualizar();
        if (accion === 'eliminar') await this.eliminar();
        if (accion === 'volver') continuar = false;
      } catch (error) {
        console.log(chalk.red(`\nError: ${error.message}\n`));
      }
    }
  }

  async listar() {
    const registros = await this.servicio.listar();
    this.mostrarRegistros(registros);
  }

  async buscar() {
    const criterios = this.servicio.obtenerCriteriosBusqueda();
    const { criterio } = await inquirer.prompt({
      type: 'list',
      name: 'criterio',
      message: 'Selecciona el criterio de búsqueda:',
      choices: criterios.map((item) => ({
        name: this.etiquetaCampo(item),
        value: item
      }))
    });

    const { valor } = await this.pedirValor(criterio, false);
    const registros = await this.servicio.buscar(criterio, valor);
    this.mostrarRegistros(registros);
  }

  async crear() {
    const campos = this.servicio.obtenerCampos();
    const datos = {};

    for (const [campo, definicion] of Object.entries(campos)) {
      if (campo === 'id') continue;
      datos[campo] = await this.pedirValor(campo, definicion.nullable);
    }

    const registro = await this.servicio.crear(datos);
    console.log(chalk.blueBright('\nRegistro creado correctamente.'));
    this.mostrarRegistro(registro);
  }

  async actualizar() {
    const registro = await this.seleccionarRegistro('actualizar');
    if (!registro) return;

    const campos = this.servicio.obtenerCampos();
    const camposModificables = Object.keys(campos).filter((campo) => campo !== 'id');

    const { campo } = await inquirer.prompt({
      type: 'list',
      name: 'campo',
      message: 'Selecciona el único campo que deseas actualizar:',
      choices: camposModificables.map((item) => ({
        name: this.etiquetaCampo(item),
        value: item
      }))
    });

    const valor = await this.pedirValor(campo, campos[campo].nullable);
    const actualizado = await this.servicio.actualizarCampo(registro.id, campo, valor);

    console.log(chalk.blueBright('\nRegistro actualizado correctamente.'));
    this.mostrarRegistro(actualizado);
  }

  async eliminar() {
    const registro = await this.seleccionarRegistro('eliminar');
    if (!registro) return;

    this.mostrarRegistro(registro);

    const { confirmar } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirmar',
      message: '¿Confirmas la eliminación?',
      default: false
    });

    if (!confirmar) {
      console.log('\nOperación cancelada.');
      return;
    }

    await this.servicio.eliminar(registro.id);
    console.log(chalk.blueBright('\nRegistro eliminado correctamente.'));
  }

  async seleccionarRegistro(accion) {
    const criterios = this.servicio.obtenerCriteriosBusqueda();
    const { criterio } = await inquirer.prompt({
      type: 'list',
      name: 'criterio',
      message: `Selecciona cómo localizar el registro que deseas ${accion}:`,
      choices: criterios.map((item) => ({
        name: this.etiquetaCampo(item),
        value: item
      }))
    });

    const { valor } = await this.pedirValor(criterio, false);
    const registros = await this.servicio.buscar(criterio, valor);

    if (!registros.length) {
      console.log('\nNo se encontraron registros.');
      return null;
    }

    if (registros.length === 1) {
      return registros[0];
    }

    const { id } = await inquirer.prompt({
      type: 'list',
      name: 'id',
      message: 'Se encontraron varios registros. Selecciona uno:',
      choices: registros.map((registro) => ({
        name: `${registro.id} - ${this.resumen(registro)}`,
        value: registro.id
      }))
    });

    return registros.find((registro) => registro.id === id);
  }

  async pedirValor(campo, opcional) {
    const definicion = this.servicio.obtenerCampos()[campo];
    const sufijo = opcional ? ' (opcional)' : '';
    const indicacion = this.indicacionCampo(campo, definicion);

    const { valor } = await inquirer.prompt({
      type: 'input',
      name: 'valor',
      message: `${this.etiquetaCampo(campo)}${sufijo}${indicacion}:`
    });

    return valor;
  }

  mostrarRegistros(registros) {
    if (!registros.length) {
      console.log('\nNo se encontraron registros.');
      return;
    }

    const campos = Object.keys(this.servicio.obtenerCampos());
    const filas = registros.map((registro) => campos.map((campo) => String(registro[campo] ?? 'NULL')));
    const anchos = campos.map((campo, indice) => Math.max(
      this.etiquetaCampo(campo).length,
      ...filas.map((fila) => fila[indice].length)
    ));
    const separador = `+${anchos.map((ancho) => '-'.repeat(ancho + 2)).join('+')}+`;

    console.log(`\n${separador}`);
    console.log(`| ${campos.map((campo, indice) => this.etiquetaCampo(campo).padEnd(anchos[indice])).join(' | ')} |`);
    console.log(separador);

    for (const fila of filas) {
      console.log(`| ${fila.map((valor, indice) => valor.padEnd(anchos[indice])).join(' | ')} |`);
    }

    console.log(`${separador}\n`);
  }

  mostrarRegistro(registro) {
    if (!registro) return;

    for (const campo of Object.keys(this.servicio.obtenerCampos())) {
      console.log(`${chalk.blueBright(this.etiquetaCampo(campo))}: ${registro[campo] ?? 'NULL'}`);
    }
  }

  resumen(registro) {
    if (registro.firstName || registro.lastName) {
      return `${registro.firstName ?? ''} ${registro.lastName ?? ''}`.trim();
    }

    return registro.code ?? registro.name ?? `ID ${registro.id}`;
  }

  etiquetaCampo(campo) {
    const etiquetas = {
      id: 'ID',
      code: 'Código',
      name: 'Nombre',
      description: 'Descripción',
      firstName: 'Nombre',
      lastName: 'Apellido',
      identification_type_id: 'ID tipo de identificación',
      identificationNumber: 'Número de identificación',
      gender: 'Género',
      birthdate: 'Fecha de nacimiento',
      email: 'Correo electrónico',
      address: 'Dirección',
      city_id: 'ID ciudad',
      capacity: 'Capacidad',
      active: 'Activo (0/1)',
      intensity: 'Intensidad',
      weight: 'Peso',
      course_id: 'ID curso',
      title: 'Título',
      teacher_id: 'ID maestro',
      classroom_id: 'ID aula',
      start_date: 'Fecha y hora de inicio',
      end_date: 'Fecha y hora de fin',
      course_schedule: 'ID horario del curso',
      student_id: 'ID estudiante',
      register_date: 'Fecha de registro',
      inscription_id: 'ID inscripción',
      rate: 'Calificación',
      comments: 'Comentarios',
      fullName: 'Nombre completo'
    };

    return etiquetas[campo] ?? campo;
  }

  indicacionCampo(campo, definicion) {
    if (campo === 'id') return '';
    if (definicion.type === 'integer') return ' [entero]';
    if (definicion.type === 'date') return ' [YYYY-MM-DD HH:mm:ss]';
    if (definicion.email) return ' [correo]';
    return '';
  }
}
