import { NgModule } from "@angular/core";
import { BreacrumbModule } from "src/@components/Breadcrumb/Breadcrumb.module";
import { PostsPage } from "./Posts.page";

@NgModule({
  declarations: [PostsPage],
  exports: [PostsPage],
  imports: [
    BreacrumbModule
  ]
})
export class PostsModule { }
