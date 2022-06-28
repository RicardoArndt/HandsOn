import { Publication, Tag } from "@entities/publication";
import { Connection } from "@infra/database";
import { PublicationById } from "@models/publication-by-id";
import { SELECT_BY_ID } from "@sql/queries/publication";

export class PublicationDao {
  constructor(
    private readonly connection: Connection
  ) { }

  public async getById(id: string): Promise<PublicationById> {
    const entity = await this.connection.get<Publication & Tag>(SELECT_BY_ID, [id]);

    return PublicationById.fromSelect(entity.rows);
  }
}
