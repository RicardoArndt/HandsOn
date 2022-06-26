/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Publication, PublicationTag, Tag } from "@entities/publication";
import { v4 as uuidv4 } from "uuid";

export class PublicationModel {
  constructor(
    private code: number,
    private title: string,
    private description: string,
    private priority: number,
    private tags: TagModel[]
  ) { }

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
