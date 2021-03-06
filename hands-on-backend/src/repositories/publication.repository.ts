/* eslint-disable @typescript-eslint/no-unsafe-call */
import { INSERT_QUERY, UPDATE_QUERY } from "@sql/queries/publication";
import { DELETE_QUERY, INSERT_QUERY as INSERT_QUERY_PB_TAG } from "@sql/queries/publication_tag";
import { Connection } from "@infra/database";
import { Publication, PublicationTag } from "@entities/publication";

export class PublicationRepository {
  constructor(
    private readonly connection: Connection
  ) { }

  public async insert(entity: {
    publication: Publication,
    publicationTags: PublicationTag[]
  }): Promise<string> {
    await this.connection.execute(INSERT_QUERY, [
      entity.publication.publication_id,
      entity.publication.title,
      entity.publication.description,
      entity.publication.created_at,
      entity.publication.created_by,
      entity.publication.priority
    ]);

    for (const publicationTag of entity.publicationTags) {
      await this.connection.execute(INSERT_QUERY_PB_TAG, [
        publicationTag.publication_tag_id,
        publicationTag.tag_id,
        publicationTag.publication_id
      ]);
    }

    return entity.publication.publication_id;
  }

  public async update(entity: {
    publication: Publication,
    publicationTags: PublicationTag[]
  }): Promise<void> {
    await this.connection.execute(UPDATE_QUERY, [
      entity.publication.publication_id,
      entity.publication.title,
      entity.publication.description,
      entity.publication.priority
    ]);

    await this.connection.execute(DELETE_QUERY, [entity.publication.publication_id]);

    for (const publicationTag of entity.publicationTags) {
      await this.connection.execute(INSERT_QUERY_PB_TAG, [
        publicationTag.publication_tag_id,
        publicationTag.tag_id,
        publicationTag.publication_id
      ]);
    }
  }
}