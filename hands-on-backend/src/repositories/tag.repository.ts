/* eslint-disable @typescript-eslint/no-unsafe-call */
import { INSERT_QUERY as INSERT_QUERY_TAG } from "@sql/queries/tag";
import { Connection } from "@infra/database";
import { Tag } from "@entities/publication";

export class TagRepository {
  constructor(
    private readonly connection: Connection
  ) { }

  public async insert(entities: Tag[]): Promise<Tag[]> {
    for (const tag of entities) {
      await this.connection.execute(INSERT_QUERY_TAG, [
        tag.tag_id,
        tag.name
      ]);
    }

    return entities;
  }
}