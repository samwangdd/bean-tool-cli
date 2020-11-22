import { Command, CommanderStatic } from 'commander';
import { AbstarctCommand } from './abstract.command';

export class InitCommand extends AbstarctCommand {
  public load(program: CommanderStatic) {
    program
      .command('init [tpl] [path]')
      .alias('i')
      .description('Init files form Git')
      .action(async (tpl: string, path: string) => {
        let inputs: any = { tpl, path };
        await this.action.handle(inputs);
      });
  }
}
