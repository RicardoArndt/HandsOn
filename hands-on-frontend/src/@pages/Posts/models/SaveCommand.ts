import { ICommand } from "src/core/commands/Command";
import { IPost } from "../services/post.service";
import { BaseConsole } from "./Base";

export interface ISaveProps {
  prefixes: string[];
  value: string;
  publication: IPost;
}

export interface ISaveService {
  saveAsync(publication: IPost): Promise<void>;
}

export class Save extends BaseConsole {
  constructor(
    public override readonly props: ISaveProps,
    private readonly service: ISaveService
  ) { super(props); }

  public async saveAsync(): Promise<void> {
    try {
      await this.service.saveAsync(this.props.publication);

      this.setConsoleMessage(`saved with sucess`);
    } catch (err: any) {
      this.setConsoleMessage(`failure ${err.message}`);
    }
  }
}

export class SaveCommand implements ICommand {
  constructor (
    private readonly _save: Save
  ) { }

  async executeAsync(): Promise<void> {
    return await this._save.saveAsync();
  }
}
