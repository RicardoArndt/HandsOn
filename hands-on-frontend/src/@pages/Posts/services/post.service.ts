import { Injectable, InjectionToken } from "@angular/core";
import { Observable, of } from "rxjs";

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
  id: string;
  code: number;
  title: string;
  priority: number;
  tags: string[];
  description: string;
}

export interface IPostService {
  getList(): Observable<IPostList[]>;
  getPostById(id: string): Observable<IPost>;
}

export const POST_SERVICE_TOKEN =
  new InjectionToken<IPostService>("IPostService");

@Injectable()
export class PostService implements IPostService {
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
    });
  }
}
