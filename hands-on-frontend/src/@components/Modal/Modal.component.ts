import { Component, Input, Type, ViewChild } from "@angular/core";
import { ModalContentDirective, NoComponent } from "./directives/modal-content.directive";
import { ModalService } from "./services/modal.service";

@Component({
  selector: "hands-on-modal",
  template: `
    <div class="modal">
      <span class="material-icons cancel" (click)="closeModal()">cancel</span>
      <div class="modal-content">
        <ng-template *modalContent="content"></ng-template>
      </div>
    </div>
  `,
  styleUrls: ["./Modal.scss"]
})
export class ModalComponent {
  @Input()
  public content: Type<Component> = NoComponent;

  @ViewChild(ModalContentDirective, {static: true})
  public modalDirective!: ModalContentDirective;

  constructor(
    private readonly modalService: ModalService
  ) { }

  public closeModal() {
    this.modalService.closeModal();
  }
}
