import { Component, Input } from "@angular/core";
import { TableValue } from "../../Table";

@Component({
  selector: "hands-on-button-column",
  template: `
    <hands-on-button
      class="column-btn"
      [title]="column.value"
      [icon]="column.icon"
      (onClick)="column.event(column.id)"></hands-on-button>
  `,
  styles: [
    `
    .column-btn {
      ::ng-deep {
        .btn {
          border: none !important;
          filter: none !important;
        }
      }
    }
    `
  ]
})
export class ButtonColumnComponent {
  @Input() column: TableValue = new TableValue();
}
