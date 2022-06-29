import { Publication, Tag } from "@entities/publication";

export interface IPublicationByIdResponse {
  id: string;
  code: number;
  title: string;
  priority: number;
  tags: string[];
  description: string;
}

export interface IPublicationResponse {
  id: string;
  code: number;
  title: string;
  createdAt: string;
  createdBy: string;
  priority: number;
  tags: string[];
  description: string;
}

export class PublicationById {
  private constructor(
    public id: string,
    public code: number,
    public title: string,
    public createdAt: string,
    public createdBy: string,
    public priority: number,
    public tags: { id: string, name: string }[],
    public description: string
  ) { }

  public static fromSelect(rows: (Publication & Tag)[]): PublicationById {
    const tags = rows.map(row => ({ id: row.tag_id, name: row.name}));

    return new PublicationById(
      rows[0].publication_id,
      rows[0].code,
      rows[0].title,
      rows[0].created_at.toLocaleDateString(),
      rows[0].created_by,
      rows[0].priority,
      tags,
      rows[0].description
    );
  }
}

export class PublicationAll {
  private constructor(
    public id: string,
    public code: number,
    public title: string,
    public createdAt: string,
    public createdBy: string,
    public priority: number,
    public tags: string[],
    public description: string
  ) { }

  public static fromSelect(rows: (Publication & Tag)[]): PublicationAll[] {
    const result: PublicationAll[] = [];

    for (const row of rows) {
      const findResult = result.find(r => r.id === row.publication_id);

      if (findResult) {
        findResult.tags.push(row.name);
        continue;
      }

      result.push(new PublicationAll(
        row.publication_id,
        row.code,
        row.title,
        row.created_at.toLocaleDateString(),
        row.created_by,
        row.priority,
        [row.name],
        row.description
      ))
    }

    return result;
  }
}