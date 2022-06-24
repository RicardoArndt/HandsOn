import { ICommand } from "../../../core/commands/Command";

export interface IClearProps {
  value: string;
  prefixes: string[];
}

export class Clear {
  constructor(
    public props: IClearProps
  ) { }

  public clean(): void {
    this.props.value = "";
    this.props.prefixes = ["cmd ->"];
  }
}

export class ClearCommand implements ICommand {
  constructor(
    private readonly _clear: Clear
  ) { }

  public executeAsync(): Promise<void> {
    return new Promise((resolve) => {
      this._clear.clean();

      return resolve();
    });
  }
}
