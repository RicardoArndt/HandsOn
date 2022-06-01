import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BreadcrumbComponent } from "./Breadcrumb.component";

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  exports: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BreacrumbModule { }
