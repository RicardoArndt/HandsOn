import { PublicationDao } from "@daos/publication.dao";
import { TagDao } from "@daos/tag.dao";
import { Connection } from "@infra/database";
import { PublicationRepository } from "@repositories/publication.repository";
import { TagRepository } from "@repositories/tag.repository";
import { PublicationService } from "@services/publication.service";

function getConnection(): Connection {
  return new Connection();
}

export function getPublicationService(): PublicationService {
  const connection = getConnection();
  const publicationRepository = new PublicationRepository(connection);
  const publicationDao = new PublicationDao(connection);
  const tagRepository = new TagRepository(connection);
  const tagDao = new TagDao(connection);
  return new PublicationService(
    publicationRepository,
    publicationDao,
    tagRepository,
    tagDao
  );
}
