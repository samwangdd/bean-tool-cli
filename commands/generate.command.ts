import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

export default class GenCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      ?.command('generate [type] [path]')
      .alias('gen')
      .description('Generate a page / component')
      .action(async (type, path) => {
        await this.action.handle();
      });
  }
}
