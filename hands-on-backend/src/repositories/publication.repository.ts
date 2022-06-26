/* eslint-disable @typescript-eslint/no-unsafe-call */
import { INSERT_QUERY } from "@sql/queries/publication";
import { INSERT_QUERY as INSERT_QUERY_PB_TAG } from "@sql/queries/publication_tag";
import { INSERT_QUERY as INSERT_QUERY_TAG } from "@sql/queries/tag";
import { Connection } from "@infra/database";
import { v4 as uuidv4 } from "uuid";
import { PublicationModel } from "@models/publication";

export class PublicationRepository {
  constructor(
    private readonly connection: Connection
  ) { }

  public async insert(publication: PublicationModel): Promise<string> {
    this.connection.open();

    const id = uuidv4();

    const entity = publication.createEntity();

    await this.connection.execute(INSERT_QUERY, [
      entity.publication.publication_id,
      entity.publication.code,
      entity.publication.title,
      entity.publication.description,
      entity.publication.created_at,
      entity.publication.created_by,
      entity.publication.priority
    ]);

    for (const entityTag of entity.tags) {
      const { tag, publicationTag } = entityTag;

      await this.connection.execute(INSERT_QUERY_TAG, [
        tag.tag_id,
        tag.name
      ]);

      await this.connection.execute(INSERT_QUERY_PB_TAG, [
        publicationTag.publication_tag_id,
        publicationTag.tag_id,
        publicationTag.publication_id
      ]);
    }

    this.connection.close();

    return id;
  }
}