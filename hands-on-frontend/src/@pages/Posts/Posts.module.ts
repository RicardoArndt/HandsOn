import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { InputModule } from "../../@components/Input/Input.module";
import { ButtonModule } from "../../@components/Button/Button.module";
import { NewPostPage } from "./@subpages/NewPost/NewPost.page";
import { PostsPage } from "./Posts.page";
import { TableModule } from "../../@components/Table/Table.module";
import { CommonModule } from "@angular/common";
import { PostService, POST_SERVICE_TOKEN } from "./services/post.service";

const routes: Route[] = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PostsPage
      },
      {
        path: "newpost",
        component: NewPostPage,
        data: {
          breadcrumb: {
            icon: "post_add",
            name: "Nova Publicação",
            title: "Adicionar nova Publicação"
          }
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    PostsPage,
    NewPostPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputModule,
    TableModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: POST_SERVICE_TOKEN,
      useClass: PostService
    }
  ]
})
export class PostsModule { }
