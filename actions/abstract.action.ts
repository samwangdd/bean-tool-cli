interface Input {
  name: string;
  value: boolean | string;
}

export abstract class AbstractAction {
  public abstract handle(inputs?: Input[], options?: Input[]): Promise<void>;
}
