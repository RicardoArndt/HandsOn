/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Publication, PublicationTag, Tag } from "@entities/publication";
import { v4 as uuidv4 } from "uuid";

export interface IPublicationCreateRequest {
  code: number;
  title: string,
  description: string,
  priority: number,
  tags: ITagCreateRequest[]
}

export interface ITagCreateRequest {
  name: string;
}

export class PublicationCreateModel {
  private code = 0;
  private title = "";
  private description = "";
  private priority = 0;
  private tags: TagCreateModel[] = [];

  private constructor(
    private existentlyTags: TagCreateModel[]
  ) { }

  public static fromRequest(
    request: IPublicationCreateRequest,
    existentlyTags: TagCreateModel[]
  ): PublicationCreateModel {
    if (
      !request.title
      || !request.description
      || !request.priority
      || !request.tags.length
    ) {
      throw new Error("Invalid body object");
    }

    const publicationCreateModel = new PublicationCreateModel(existentlyTags);

    publicationCreateModel.title = request.title;
    publicationCreateModel.description = request.description;
    publicationCreateModel.priority = request.priority;
    publicationCreateModel.tags = request.tags
      .filter(t => !publicationCreateModel.tagExists(t.name))
      .map(tag => TagCreateModel.fromJson(tag.name));
    publicationCreateModel.title = request.title;


    return publicationCreateModel;
  }

  public createEntitiesToInsert(existentlyTags: TagCreateModel[]): {
    publication: Publication,
    tags: Tag[],
    publicationTags: PublicationTag[]
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
      tags: this.tags
        .filter(t => !this.tagExists(t.getName()))
        .map(t => new Tag(t.getId(), t.getName())),
      publicationTags: this.tags
        .map(t => new PublicationTag(uuidv4(), publicationId, t.getId()))
        .concat(existentlyTags.map(t => new PublicationTag(uuidv4(), publicationId, t.getId())))
    };
  }

  public getTagNames(): string[] {
    return this.tags.map(tag => tag.getName());
  }

  private tagExists(name: string): TagCreateModel | undefined {
    return this.existentlyTags.find(t => t.getName() === name);
  }
}

export class TagCreateModel {
  private tagId: string;

  constructor(
    private name: string,
    tagId?: string
  ) {
    this.tagId = tagId ?? uuidv4();
  }

  public static fromJson(name: string): TagCreateModel {
    if (!name) {
      throw new Error("Invalid Tag");
    }

    return new TagCreateModel(name);
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.tagId;
  }
}
