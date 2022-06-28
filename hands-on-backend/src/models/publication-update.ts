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
    request: IPublicationUpdateRequest
  ): PublicationUpdateModel {
    return new PublicationUpdateModel(
      request.title,
      request.description,
      request.priority,
      request.tags.map(tag => TagUpdateModel.fromRequest(tag)));
  }
}

export class TagUpdateModel {
  private constructor(
    private name: string
  ) { }

  public static fromRequest(
    request: ITagUpdateRequest
  ): TagUpdateModel {
    return new TagUpdateModel(request.name);
  }
}
