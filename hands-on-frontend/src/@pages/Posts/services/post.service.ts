import { Injectable, InjectionToken } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { ISaveService } from "../models/SaveCommand";

export interface IPostList {
  id: string;
  code: number;
  title: string;
  createdAt: Date;
  createdBy: string;
  priority: number;
  tags: string[];
}

export interface IPost {
  [key: string]: string | number | string[];
  _id: string;
  _code: number;
  title: string;
  priority: number;
  tags: string[];
  description: string;
}

export interface IPostService extends ISaveService {
  getList(): Observable<IPostList[]>;
  getPostById(id: string): Observable<IPost>;
}

export const POST_SERVICE_TOKEN =
  new InjectionToken<IPostService>("IPostService");

@Injectable()
export class PostService implements IPostService {
  public saveAsync(publication: IPost): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public getList(): Observable<IPostList[]> {
    return of([
      {
        id: "guid",
        code: 204,
        title: "Implementando o padrão command",
        createdAt: new Date(),
        createdBy: "Ricardo Guilherme Arndt",
        priority: 2,
        tags: ["Frontend", "Angular", "Design patterns"]
      },
      {
        id: "guid 2",
        code: 205,
        title: "Implementando o padrão factory",
        createdAt: new Date(),
        createdBy: "Luiz Eduardo Vollrath",
        priority: 1,
        tags: ["Backend", "C#", "Design patterns"]
      }
    ]);
  }

  public getPostById(id: string): Observable<IPost> {
    return of({
      id: "guid 2",
      code: 205,
      title: "Implementando o padrão factory",
      priority: 1,
      tags: ["Backend", "C#", "Design patterns"],
      description: "description"
    }).pipe(map(publication => (
      {
        _id: publication.id,
        _code: publication.code,
        description: publication.description,
        priority: publication.priority,
        tags: publication.tags,
        title: publication.title
      })));
  }
}
