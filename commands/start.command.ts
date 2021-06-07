import { Command, CommanderStatic } from 'commander';
import { Input } from '~/commands/command.input';
import { AbstractCommand } from './abstract.command';

export class StartCommand extends AbstractCommand {
  public load(program: CommanderStatic): void {
    program
      .command('start')
      .option('-w, --watch', 'Run in watch mode.')
      .description('Run wyp application.')
      .action(async (app: string, command: Command) => {
        const options: Input[] = [];
        options.push({ name: 'config', value: command.config });
      });
  }
}
