import { Publication, PublicationTag, Tag } from "@entities/publication";
import { v4 as uuidv4 } from "uuid";
import { PublicationById } from "./publication-by-id";
import { TagCreateModel } from "./publication-create";

export interface IPublicationUpdateRequest {
  title: string,
  description: string,
  priority: number,
  tags: ITagUpdateRequest[]
}

export interface ITagUpdateRequest {
  name: string;
}

export class PublicationUpdateModel {
  private constructor(
    private title: string,
    private description: string,
    private priority: number,
    private tags: TagUpdateModel[]
  ) { }

  public static fromRequest(
    request: IPublicationUpdateRequest,
    existentlyTags: TagCreateModel[]
  ): PublicationUpdateModel {
    return new PublicationUpdateModel(
      request.title,
      request.description,
      request.priority,
      request.tags.map(tag => {
        const tagId = existentlyTags.find(t => t.getName() === tag.name)?.getId();

        return TagUpdateModel.fromRequest(tag, tagId);
      }));
  }

  public createEntityToUpdate(
    existentlyPublication: PublicationById
  ): {
    publication: Publication,
    publicationTags: PublicationTag[],
    tags: Tag[]
   } {
    existentlyPublication.title = this.title;
    existentlyPublication.description = this.description;
    existentlyPublication.priority = this.priority;
    existentlyPublication.tags = this.tags.map(tag => ({ id: tag.getId(), name: tag.getName() }));

    return {
      publication: new Publication(
        existentlyPublication.id,
        existentlyPublication.code,
        existentlyPublication.title,
        existentlyPublication.description,
        new Date(existentlyPublication.createdAt),
        existentlyPublication.createdBy,
        existentlyPublication.priority
      ),
      tags: existentlyPublication.tags.map(tag => new Tag(tag.id, tag.name)),
      publicationTags: existentlyPublication.tags
        .map(tag => new PublicationTag(uuidv4(), existentlyPublication.id, tag.id))
    };
  }
}

export class TagUpdateModel {
  private tagId: string;

  private constructor(
    private name: string,
    tagId?: string
  ) {
    this.tagId = tagId ?? uuidv4();
  }

  public static fromRequest(
    request: ITagUpdateRequest,
    id: string | undefined,
  ): TagUpdateModel {
    return new TagUpdateModel(request.name, id);
  }

  public getId(): string {
    return this.tagId;
  }

  public getName(): string {
    return this.name;
  }
}
