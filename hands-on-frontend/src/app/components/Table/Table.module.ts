import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "../Button/Button.module";
import { ButtonColumnComponent } from "./components/ButtonColumn/ButtonColumn.component";
import { TableColumnDirective } from "./directives/table-column.directive";
import { TableComponent } from "./Table.component";

@NgModule({
  declarations: [
    TableComponent,
    ButtonColumnComponent,
    TableColumnDirective
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class TableModule { }
