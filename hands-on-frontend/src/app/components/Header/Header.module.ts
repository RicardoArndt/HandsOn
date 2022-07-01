import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./Header.component";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    RouterModule
  ]
})
export class HeaderModule { }
