import { ICommand } from "src/core/commands/Command";
import { IPost, IPostCreateRequest } from "../services/post.service";
import { BaseConsole } from "./Base";

export interface ISaveProps {
  prefixes: string[];
  value: string;
  publication: IPost;
}

export interface ISaveService {
  createAsync(publication: IPostCreateRequest): Promise<string>;
  updateAsync(publication: IPostCreateRequest): Promise<Object>;
}

export class Save extends BaseConsole {
  constructor(
    public override readonly props: ISaveProps,
    private readonly service: ISaveService
  ) { super(props); }

  public async saveAsync(): Promise<void> {
    const {
      title,
      priority,
      tags,
      description
    } = this.props.publication;

    try {
      if (this.props.publication._id) {
        await this.service.updateAsync({
          description,
          priority,
          title,
          tags: tags.map(tag => ({
            name: tag
          }))
        });
      } else {
        await this.service.createAsync({
          description,
          priority,
          title,
          tags: tags.map(tag => ({
            name: tag
          }))
        });
      }

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
