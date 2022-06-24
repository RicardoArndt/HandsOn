import { ICommand } from "../../../core/commands/Command";
import { IPost } from "../services/post.service";
import { BaseConsole } from "./Base";

export interface ISetterProps {
  value: string;
  publication: IPost;
  prefixes: string[];
}

export class Setter extends BaseConsole {
  constructor(
    public override props: ISetterProps,
    public fullCommand: string,
  ) { super(props); }

  public checkConsoleValueMatch() {
    const match = this.fullCommand.match(/set \w*=\w*/);
    if (!match) {
      throw new Error("invalid set command");
    }
  }

  public checkPropertyExists() {
    const property = this.getPropertyConsole();
    if (this.props.publication[property] === undefined) {
      throw new Error(`propery ${property} does not exists`);
    }
  }

  public set(): void {
    const property = this.getPropertyConsole();
    const value = this.getValueConsole();
    this.props.publication[property] = isNaN(+value) ? value : +value;

    this.setMessageConsole(`property ${property} has been setted ${value}`);
  }

  private getPropertyConsole(): string {
    return this.getValueWithoutCommandSet().split("=")[0];
  }

  private getValueConsole(): string {
    return this.getValueWithoutCommandSet().split("=")[1].replace("\n", "");
  }

  private getValueWithoutCommandSet(): string {
    return this.fullCommand.replace("set ", "");
  }
}

export class SetterCommand implements ICommand {
  constructor(
    private readonly _setter: Setter
  ) { }

  public executeAsync(): Promise<void> {
    return new Promise((resolve) => {
      try {
        this._setter.checkConsoleValueMatch();
        this._setter.checkPropertyExists();
        this._setter.set();
      } catch (err: any) {
        this._setter.setMessageConsole(err.message);
      }

      resolve();
    });
  }
}
