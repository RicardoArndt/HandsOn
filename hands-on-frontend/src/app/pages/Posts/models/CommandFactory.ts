import { Inject, Injectable, InjectionToken } from "@angular/core";
import { ICommand } from "../../../core/commands/Command";
import { Clear, ClearCommand } from "./ClearCommand";
import { AvailableCommands } from "./AvailableCommands";
import { NoCommand, NotFound } from "./NoCommand";
import { Setter, SetterCommand } from "./SetterCommand";
import { IPost, IPostService, POST_SERVICE_TOKEN } from "../services/post.service";
import { Save, SaveCommand } from "./SaveCommand";

export interface IModalCommandProps {
  value: string;
  prefixes: string[];
  publication: IPost;
}

export const COMMAND_FACTORY_TOKEN = new InjectionToken("CommandFactory");

export interface ICommandFactory {
  getCommand(props: IModalCommandProps): ICommand;
}

@Injectable()
export class CommandFactory implements ICommandFactory {
  constructor(
    @Inject(POST_SERVICE_TOKEN)
    private readonly postService: IPostService
  ) { }

  public getCommand(props: IModalCommandProps): ICommand {
    const values = props.value.split("\n").filter(v => v);

    let value = props.value;
    if (values.length > 1) {
      value = values[values.length - 1];
    }

    const switchValue = value
      .replace(/\n/g, "")
      .split(" ")[0]
      .toLowerCase();

    switch(switchValue) {
      case AvailableCommands.Clear:
        return new ClearCommand(new Clear(props));
      case AvailableCommands.Set:
        return new SetterCommand(new Setter(props, value));
      case AvailableCommands.Save:
        return new SaveCommand(new Save(props, this.postService));
      default:
        return new NoCommand(new NotFound(props));
    }
  }
}
