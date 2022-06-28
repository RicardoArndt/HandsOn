import { Publication, Tag } from "@entities/publication";

export interface IPublicationByIdResponse {
  id: string;
  code: number;
  title: string;
  priority: number;
  tags: string[];
  description: string;
}

export class PublicationById {
  private constructor(
    public id: string,
    public code: number,
    public title: string,
    public priority: number,
    public tags: string[],
    public description: string
  ) { }

  public static fromSelect(rows: (Publication & Tag)[]): PublicationById {
    const tags: string[] = rows.map(row => row.name);

    return new PublicationById(
      rows[0].publication_id,
      rows[0].code,
      rows[0].title,
      rows[0].priority,
      tags,
      rows[0].description
    );
  }
}
