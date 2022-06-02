import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableComponent } from "./Table.component";

@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TableModule { }
