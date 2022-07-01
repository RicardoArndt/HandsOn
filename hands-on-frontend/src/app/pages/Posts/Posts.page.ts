import { Component, Inject, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, firstValueFrom, map, throwError } from "rxjs";
import { ModalService } from "../../components/Modal/services/modal.service";
import { ITableBodyElement, ITableHeadElement, TableColumnType, TableValue } from "../../components/Table/Table";
import { PostEditModalComponent } from "./components/PostEditModal.component";
import { IPostService, POST_SERVICE_TOKEN } from "./services/post.service";

interface IPostSearchParams {
  title: string;
}

@Component({
  template: `
    <div class="page">
      <div class="actions">
        <hands-on-input [(value)]="postSearchParams.title" (valueChange)="getTable()"></hands-on-input>

        <hands-on-button
          name="Adicionar"
          (onClick)="goToNewPost()">
        </hands-on-button>
      </div>

      <div class="list">
        <hands-on-table
          [headElements]="tableHead"
          [bodyElement]="tableBody">
        </hands-on-table>
      </div>
    </div>
  `,
  styleUrls: ["./Posts.scss"]
})
export class PostsPage implements OnInit {
  public tableHead: ITableHeadElement[] = [
    {
      name: "Código"
    },
    {
      name: "Título"
    },
    {
      name: "Data Criação"
    },
    {
      name: "Usuário Criação"
    },
    {
      name: "Prioridade"
    },
    {
      name: "Tags"
    },
    {
      name: "Ações"
    }
  ];

  public tableBody: ITableBodyElement = { rows: [] };

  public postSearchParams: IPostSearchParams = { title: "" };

  constructor(
    private readonly router: Router,
    private readonly modalService: ModalService,
    @Inject(POST_SERVICE_TOKEN)
    private readonly postService: IPostService,
    private readonly viewContainer: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    this.getTable();
  }

  public goToNewPost(): void {
    this.router.navigate(["posts", "newpost"]);
  }

  public async onClickEdit(id: string) {
    const modalRef = await this.modalService.openModal(this.viewContainer, PostEditModalComponent);
    modalRef.id = id;
  }

  public getTable(): void {
    const result = this.postService.getList(this.postSearchParams.title).pipe(
      map(posts => ({
        rows: posts.map(post => ({
          columns: [
            {
              column: new TableValue(post.id, post.code)
            },
            {
              column: new TableValue(post.id, post.title)
            },
            {
              column: new TableValue(post.id, post.createdAt.toLocaleDateString("pt-BR"))
            },
            {
              column: new TableValue(post.id, post.createdBy)
            },
            {
              column: new TableValue(post.id, post.priority)
            },
            {
              column: new TableValue(post.id, post.tags.join(", "))
            },
            {
              column: new TableValue(post.id, "", TableColumnType.Button, "edit_note", this.onClickEdit.bind(this))
            }
          ]
        }))
      })),
      catchError(err => throwError(() => new Error(err)))
    );

    firstValueFrom(result)
      .then(body => this.tableBody = body);
  }
}
