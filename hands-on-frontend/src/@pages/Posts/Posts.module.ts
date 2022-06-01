import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ButtonModule } from "../../@components/Button/Button.module";
import { NewPostPage } from "./@subpages/NewPost/NewPost.page";
import { PostsPage } from "./Posts.page";

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
    RouterModule.forChild(routes),
    ButtonModule
  ],
  exports: [
    RouterModule
  ]
})
export class PostsModule { }
