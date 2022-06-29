import { PublicationDao } from "@daos/publication.dao";
import { TagDao } from "@daos/tag.dao";
import { IPublicationByIdResponse, IPublicationResponse } from "@models/publication-by-id";
import { IPublicationCreateRequest, PublicationCreateModel } from "@models/publication-create";
import { IPublicationUpdateRequest, PublicationUpdateModel } from "@models/publication-update";
import { PublicationRepository } from "@repositories/publication.repository";
import { TagRepository } from "@repositories/tag.repository";

export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly publicationDao: PublicationDao,
    private readonly tagRepository: TagRepository,
    private readonly tagDao: TagDao
  ) { }

  public async insert(request: IPublicationCreateRequest): Promise<string> {
    const existentlyTags = await this.tagDao.getExistsByNames(request.tags.map(t => t.name));

    const publicationModel = PublicationCreateModel.fromRequest(request, existentlyTags);

    const entity = publicationModel.createEntitiesToInsert(existentlyTags);

    await this.tagRepository.insert(entity.tags);
    const publicationId = await this.publicationRepository.insert(entity);

    return publicationId;
  }

  public async update(id: string, request: IPublicationUpdateRequest): Promise<void> {
    const existentlyPublication = await this.publicationDao.getById(id);

    const existentlyTags = await this.tagDao.getExistsByNames(request.tags.map(t => t.name));

    const publicationModel = PublicationUpdateModel.fromRequest(request, existentlyTags);

    const entity = publicationModel.createEntityToUpdate(existentlyPublication);

    await this.tagRepository.insert(
      entity.tags.filter(t => !existentlyTags.map(e => e.getName()).includes(t.name)));
    await this.publicationRepository.update(entity);
  }

  public async getById(id: string): Promise<IPublicationByIdResponse> {
    const publication = await this.publicationDao.getById(id);

    return {
      code: publication.code,
      description: publication.description,
      id: publication.id,
      priority: publication.priority,
      title: publication.title,
      tags: publication.tags.map(t => t.name)
    }
  }

  public async getAll(): Promise<IPublicationResponse[]> {
    const publications = await this.publicationDao.getAll();

    return publications.map(publication => ({
      ...publication
    }))
  }
}
