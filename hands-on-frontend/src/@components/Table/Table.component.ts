import { Component, Input } from "@angular/core";
import { ITableBodyElement, ITableHeadElement } from "./Table";

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
            <td *ngFor="let column of row.columns" [title]="column.value">
              {{ column.value }}
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
}
