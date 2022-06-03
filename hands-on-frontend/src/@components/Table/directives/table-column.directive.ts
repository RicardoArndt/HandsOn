import { Directive, Inject, InjectionToken, Input, OnChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { ITableColumnFactory, TableColumnFactory } from "../services/table-column.factory";
import { TableValue, TableColumnType } from "../Table";

export const TABLE_COLUMN_FACTORY_TOKEN =
  new InjectionToken<ITableColumnFactory>("ITableColumnFactory");

@Directive({
  selector: '[tableColumn]',
  providers: [
    {
      provide: TABLE_COLUMN_FACTORY_TOKEN,
      useClass: TableColumnFactory
    }
  ],
})
export class TableColumnDirective implements OnChanges {
  @Input() tableColumn: TableValue | TableValue[] = [];

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    @Inject(TABLE_COLUMN_FACTORY_TOKEN)
    private readonly tableColumnFactory: ITableColumnFactory
  ) { }

  public get columnType(): TableColumnType {
    if (this.tableColumn instanceof TableValue) {
      return this.tableColumn.type as TableColumnType;
    }

    return this.tableColumn[0].type as TableColumnType;
  }

  public ngOnChanges(): void {
    this.createElement();
  }

  private createElement(): void {
    this.viewContainer.clear();
    this.loadComponent();
  }

  private loadComponent(): void {
    const instance = this.tableColumnFactory.createComponent(this.columnType);
    instance.column = this.tableColumn as TableValue;
  }
}
