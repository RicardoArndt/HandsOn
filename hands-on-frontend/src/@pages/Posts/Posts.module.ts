import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { InputModule } from "../../@components/Input/Input.module";
import { ButtonModule } from "../../@components/Button/Button.module";
import { NewPostPage } from "./@subpages/NewPost/NewPost.page";
import { PostsPage } from "./Posts.page";
import { TableModule } from "../../@components/Table/Table.module";
import { CommonModule } from "@angular/common";
import { PostService, POST_SERVICE_TOKEN } from "./services/post.service";
import { ModalModule } from "../../@components/Modal/Modal.module";
import { PostEditModalComponent } from "./components/PostEditModal.component";
import { CommandFactory, COMMAND_FACTORY_TOKEN } from "./models/Command";
import { FormsModule } from "@angular/forms";

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
    NewPostPage,
    PostEditModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    FormsModule,
    InputModule,
    TableModule,
    ModalModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: POST_SERVICE_TOKEN,
      useClass: PostService
    },
    {
      provide: COMMAND_FACTORY_TOKEN,
      useClass: CommandFactory
    }
  ]
})
export class PostsModule { }
