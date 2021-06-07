import { Input } from '~/commands/command.input';

// 抽象 Action
export abstract class AbstractAction {
  public abstract handle(inputs?: Input[], options?: Input[]): Promise<void>;
}
