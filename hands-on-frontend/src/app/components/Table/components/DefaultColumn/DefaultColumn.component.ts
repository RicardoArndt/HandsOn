import { Component, Input } from "@angular/core";
import { TableValue } from "../../Table";

@Component({
  selector: "hands-on-default-column",
  template: `
    <span>{{ column.value }}</span>
  `
})
export class DefaultColumnComponent {
  @Input() column: TableValue = new TableValue();
}
