import { Injectable, InjectionToken } from "@angular/core";

export class AvailableCommands {
  public static Clear: string = "clear";
}

export interface IModalCommandProps {
  value: string;
  prefixes: string[];
}

export const COMMAND_FACTORY_TOKEN = new InjectionToken("CommandFactory");

export interface ICommandFactory {
  getCommand(props: IModalCommandProps): ICommand;
}

@Injectable()
export class CommandFactory implements ICommandFactory {
  public getCommand(props: IModalCommandProps): ICommand {
    const values = props.value.split("\n").filter(v => v);

    let value = props.value;
    if (values.length > 1) {
      value = values[values.length - 1];
    }

    switch(value.replace(/\n|\s/g, "").toLowerCase()) {
      case AvailableCommands.Clear:
        return new ClearCommand(new Clear(props));
      default:
        return new NoCommand(new NotFound(props));
    }
  }
}

export interface ICommand {
  executeAsync(): Promise<void>;
}

export class Clear {
  constructor(
    public props: IModalCommandProps
  ) { }

  public clean(): void {
    this.props.value = "";
    this.props.prefixes = ["cmd ->"];
  }
}

export class NotFound {
  constructor(
    public props: IModalCommandProps
  ) { }

  public log(): void {
    this.props.prefixes.push("cmd ->");
    this.props.value += "command not found\n";
    this.props.prefixes.push("cmd ->");
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
