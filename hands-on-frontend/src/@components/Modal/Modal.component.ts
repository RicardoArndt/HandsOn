import { Component, Input, Type, ViewChild } from "@angular/core";
import { ModalContentDirective, NoComponent } from "./directives/modal-content.directive";

@Component({
  selector: "hands-on-modal",
  template: `
    <div class="modal">
      <ng-template *modalContent="content"></ng-template>
    </div>
  `,
  styleUrls: ["./Modal.scss"]
})
export class ModalComponent {
  @Input()
  public content: Type<Component> = NoComponent;

  @ViewChild(ModalContentDirective, {static: true})
  public modalDirective!: ModalContentDirective;
}
