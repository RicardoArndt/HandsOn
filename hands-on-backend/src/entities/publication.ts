export class Publication {
  public constructor(
    public publication_id: string,
    public code: number,
    public title: string,
    public description: string,
    public created_at: Date,
    public created_by: string,
    public priority: number
  ) { }
}

export class PublicationTag {
  public constructor(
    public publication_tag_id: string,
    public publication_id: string,
    public tag_id: string
  ) { }
}

export class Tag {
  public constructor(
    public tag_id: string,
    public name: string
  ) { }
}
