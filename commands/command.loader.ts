import { CommanderStatic } from 'commander';
import { InitAction } from '../actions';
import { InitCommand } from './init.command';
import { StartCommand } from './start.command';

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new InitCommand(new InitAction()).load(program);
    new StartCommand(new InitAction()).load(program);
  }
}
