import { AbstractAction } from './abstract.action';

export default class GenerateAction extends AbstractAction {
  public async handle(inputs: any) {
    console.log('inputs :>> ', inputs);
  }
}
