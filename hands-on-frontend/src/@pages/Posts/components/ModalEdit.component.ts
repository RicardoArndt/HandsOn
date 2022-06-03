import { Component, Input } from "@angular/core";

@Component({
  selector: "hands-on-modal-edit",
  template: `
    <h1>{{ id }}</h1>
  `
})
export class ModalEditComponent {
  @Input() public id: string = "";
}
