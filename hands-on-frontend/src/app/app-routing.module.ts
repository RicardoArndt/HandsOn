import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    data: {
      breadcrumb: {
        icon: "home",
        name: "Home",
        title: "Home Page"
      }
    },
    children: [
      {
        path: "home",
        loadChildren: () => import("../@pages/Home/Home.module")
          .then(module => module.HomeModule),
      },
      {
        path: "posts",
        loadChildren: () => import("../@pages/Posts/Posts.module")
          .then(module => module.PostsModule),
        data: {
          breadcrumb: {
            icon: "post_add",
            name: "Publicações",
            title: "Listagem de Publicações"
          }
        },
      }
    ],
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
