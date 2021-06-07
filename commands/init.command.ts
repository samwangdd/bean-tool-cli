import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

/**
 * 初始化命令
 *
 * @export
 * @class InitCommand
 * @extends {AbstractCommand}
 */
export class InitCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      ?.command('init [tpl] [path]')
      .alias('i')
      .description('Init your PC system.')
      .action(async (tpl: string, path: string) => {
        const inputs: any = { tpl, path };
        await this.action.handle(inputs);
      });
  }
}
