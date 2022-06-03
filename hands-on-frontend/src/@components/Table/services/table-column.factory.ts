import { Injectable, ViewContainerRef } from "@angular/core";
import { ButtonColumnComponent } from "../@components/ButtonColumn/ButtonColumn.component";
import { DefaultColumnComponent } from "../@components/DefaultColumn/DefaultColumn.component";
import { TableColumnType } from "../Table";

type UnionType = ButtonColumnComponent | DefaultColumnComponent ;

export interface ITableColumnFactory {
  createComponent(type: TableColumnType): UnionType;
}

@Injectable()
export class TableColumnFactory implements ITableColumnFactory {
  constructor(
    private readonly viewContent: ViewContainerRef
  ) { }

  createComponent(type: TableColumnType): UnionType {
    switch (type) {
      case TableColumnType.Button:
        return this.viewContent.createComponent(ButtonColumnComponent).instance;
      default:
        return this.viewContent.createComponent(DefaultColumnComponent).instance;
    }
  }
}
