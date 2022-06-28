import { Tag } from "@entities/publication";
import { Connection } from "@infra/database";
import { TagCreateModel } from "@models/publication-create";
import { SELECT_IN_NAMES } from "@sql/queries/tag";

export class TagDao {
  constructor(
    private readonly connection: Connection
  ) { }

  public async getExistsByNames(names: string[]): Promise<TagCreateModel[]> {
    const result = await this.connection.get<Tag>(SELECT_IN_NAMES(names), names);

    return result.rows.map((row: Tag) => new TagCreateModel(row.name, row.tag_id));
  }
}
