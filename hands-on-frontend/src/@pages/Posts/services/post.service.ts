import { Injectable, InjectionToken } from "@angular/core";
import { firstValueFrom, map, Observable } from "rxjs";
import { ISaveService } from "../models/SaveCommand";
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment";

export interface IPostList {
  id: string;
  code: number;
  title: string;
  createdAt: Date;
  createdBy: string;
  priority: number;
  tags: string[];
}

export interface IPostListResponse {
  id: string;
  code: number;
  title: string;
  createdAt: string;
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

export interface IPostByIdResponse {
  id: string;
  code: number;
  title: string;
  priority: number;
  tags: string[];
  description: string;
}

export interface IPostCreateRequest {
  title: string;
  description: string;
  priority: number;
  tags: ITagCreateRequest[];
}

export interface IPostUpdateRequest {
  id: string;
  title: string;
  description: string;
  priority: number;
  tags: ITagCreateRequest[];
}

export interface ITagCreateRequest {
  name: string;
}

export interface IPostService extends ISaveService {
  getList(): Observable<IPostList[]>;
  getPostById(id: string): Promise<IPost>;
}

export const POST_SERVICE_TOKEN =
  new InjectionToken<IPostService>("IPostService");

@Injectable()
export class PostService implements IPostService {
  constructor(private readonly httpClient: HttpClient) { }

  public createAsync(publication: IPostCreateRequest): Promise<string> {
    return firstValueFrom(
      this.httpClient.post<string>(`${environment.apiUrl}/publications`, publication)
        .pipe(
          map(p => p)));
  }

  public updateAsync(publication: IPostUpdateRequest): Promise<Object> {
    return firstValueFrom(
      this.httpClient.put<string>(`${environment.apiUrl}/publications/${publication.id}`, publication));
  }

  public getList(): Observable<IPostList[]> {
    return this.httpClient.get<IPostListResponse[]>(`${environment.apiUrl}/publications`)
      .pipe(
        map(res => res.map(p => ({ ...p, createdAt: new Date(p.createdAt) }))));
  }

  public getPostById(id: string): Promise<IPost> {
    return firstValueFrom(
      this.httpClient.get<IPostByIdResponse>(`${environment.apiUrl}/publications/${id}`)
        .pipe(
          map(res => (
            {
              ...res,
              _id: res.id,
              _code: res.code
            }
          ))));
  }
}
