import inquirer from 'inquirer';
import chalk from 'chalk';

export default class MenuCommand {
  constructor(entidades) {
    this.entidades = entidades;
  }

  async ejecutar() {
    let continuar = true;

    while (continuar) {
      console.clear();
      console.log(chalk.blueBright('========================================'));
      console.log(chalk.blueBright('       ACADEMIA EDU-LEDGER CLI'));
      console.log(chalk.blueBright('========================================\n'));

      const { entidad } = await inquirer.prompt({
        type: 'list',
        name: 'entidad',
        message: 'Selecciona una entidad:',
        choices: [
          ...this.entidades.map((item) => ({ name: item.nombre, value: item })),
          new inquirer.Separator(),
          { name: 'Salir', value: null }
        ]
      });

      if (!entidad) {
        continuar = false;
        continue;
      }

      await entidad.command.ejecutar();
    }
  }
}
