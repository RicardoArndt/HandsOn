import { ICommand } from "../../../core/commands/Command";
import { BaseConsole } from "./Base";

export interface INotFoundProps {
  value: string;
  prefixes: string[];
}

export class NotFound extends BaseConsole {
  constructor(
    public override props: INotFoundProps
  ) { super(props); }

  public log(): void {
    this.setConsoleMessage("command not found");
  }
}

export class NoCommand implements ICommand {
  constructor(
    private readonly _notFound: NotFound
  ) { }

  public executeAsync(): Promise<void> {
    return new Promise((resolve) => {
      this._notFound.log();

      return resolve();
    });
  }
}
