import { TagDao } from "@daos/tag.dao";
import { IPublicationCreateRequest, PublicationCreateModel } from "@models/publication-create";
import { PublicationRepository } from "@repositories/publication.repository";
import { TagRepository } from "@repositories/tag.repository";

export class PublicationService {
  constructor(
    private readonly repository: PublicationRepository,
    private readonly tagRepository: TagRepository,
    private readonly tagDao: TagDao
  ) { }

  public async insert(request: IPublicationCreateRequest): Promise<string> {
    const existentlyTags = await this.tagDao.getExistsByNames(request.tags.map(t => t.name));

    const publicationModel = PublicationCreateModel.fromRequest(request, existentlyTags);

    const entity = publicationModel.createEntitiesToInsert(existentlyTags);

    await this.tagRepository.insert(entity.tags);
    const publicationId = await this.repository.insert(entity);

    return publicationId;
  }
}
