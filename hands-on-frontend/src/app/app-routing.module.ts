import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "../@pages/Home/Home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    data: {
      breadcrumb: {
        icon: "home",
        name: "Home",
        titlePage: "Home Page"
      }
    },
    children: [
      {
        path: "posts",
        loadChildren: () => import("../@pages/Posts/Posts.module")
          .then(module => module.PostsModule),
        data: {
          breadcrumb: {
            icon: "post_add",
            name: "Posts",
            titlePage: "Listagem de Posts"
          }
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
