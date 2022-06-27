/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Publication, PublicationTag, Tag } from "@entities/publication";
import { v4 as uuidv4 } from "uuid";

export interface IPublicationRequest {
  code: number;
  title: string,
  description: string,
  priority: number,
  tags: ITagRequest[]
}

export interface ITagRequest {
  name: string;
}

export class PublicationModel {
  private code = 0;

  private constructor(
    private title: string,
    private description: string,
    private priority: number,
    private tags: TagModel[]
  ) { }

  public static fromRequest(request: IPublicationRequest): PublicationModel {
    if (
      !request.title
      || !request.description
      || !request.priority
      || !request.tags.length
    ) {
      throw new Error("Invalid body object");
    }

    return new PublicationModel(
      request.title,
      request.description,
      request.priority,
      request.tags.map(tag =>
        TagModel.fromJson(tag.name))
    );
  }

  public createEntity(): {
    publication: Publication,
    tags: {
      tag: Tag,
      publicationTag: PublicationTag
    }[]
  } {
    const publicationId = uuidv4();

    return {
      publication: new Publication(
        publicationId,
        this.code,
        this.title,
        this.description,
        new Date(),
        uuidv4(),
        this.priority
      ),
      tags: this.tags.map(tagModel =>
        tagModel.createEntityForPublication(publicationId))
    };
  }
}

export class TagModel {
  constructor(
    private name: string
  ) { }

  public static fromJson(name: string): TagModel {
    if (!name) {
      throw new Error("Invalid Tag");
    }

    return new TagModel(name);
  }

  public createEntityForPublication(publicationId: string): {
    tag: Tag,
    publicationTag: PublicationTag
  } {
    const tagId = uuidv4();
    return {
      tag: new Tag(tagId, this.name),
      publicationTag: new PublicationTag(uuidv4(), publicationId, tagId)
    };
  }
}
