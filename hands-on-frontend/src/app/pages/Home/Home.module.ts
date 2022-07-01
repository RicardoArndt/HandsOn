import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { BreacrumbModule } from "../../components/Breadcrumb/Breadcrumb.module";
import { HomePage } from "./Home.page";

const routes: Route[] = [
  {
    path: "",
    component: HomePage
  }
];

@NgModule({
  declarations: [
    HomePage
  ],
  exports: [
    RouterModule
  ],
  imports: [
    BreacrumbModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
