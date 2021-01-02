export interface Input {
  name: string;
  value: boolean | string;
}

// 抽象 Action
export abstract class AbstractAction {
  public abstract handle(inputs?: Input[], options?: Input[]): Promise<void>;
}
