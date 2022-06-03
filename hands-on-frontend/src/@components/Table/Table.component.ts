import { Component, Input } from "@angular/core";
import { ITableBodyElement, ITableColumn, ITableHeadElement, TableValue } from "./Table";

@Component({
  selector: "hands-on-table",
  styleUrls: ["./Table.scss"],
  template: `
    <div class="table">
      <table>
        <thead>
          <tr>
            <th *ngFor="let head of headElements">
              {{ head.name }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let row of bodyElement.rows">
            <td *ngFor="let column of row.columns" [title]="title(column)">
              <ng-template *tableColumn="column.column"></ng-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TableComponent {
  @Input() public headElements: ITableHeadElement[] = [];
  @Input() public bodyElement: ITableBodyElement = { rows: [] };

  constructor() { }

  public title(column: ITableColumn): string {
    if (column.column instanceof TableValue) {
      return column.column.value.toString();
    }

    return "";
  }
}
