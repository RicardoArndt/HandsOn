export interface ICommand {
  executeAsync(): Promise<void>;
}
