export class Publication {
  constructor(
    private id: string,
    private code: number,
    private title: string,
    private createdAt: Date,
    private createdBy: string,
    private priority: number,
    private tags: PublicationTag[]
  ) { }
}

export class PublicationTag {
  constructor(
    private id: string,
    private publicationId: string,
    private tagId: string
  ) { }
}

export class Tag {
  constructor(
    private id: string,
    private name: string
  ) { }
}
