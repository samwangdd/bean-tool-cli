import { CommanderStatic } from 'commander';
import { AbstractAction } from '../actions/abstract.action';

export abstract class AbstarctCommand {
  constructor(protected action: AbstractAction) {}

  public abstract load(program: CommanderStatic): void;
}
