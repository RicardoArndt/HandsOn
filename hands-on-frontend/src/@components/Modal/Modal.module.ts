import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalContentDirective } from "./directives/modal-content.directive";
import { ModalComponent } from "./Modal.component";

@NgModule({
  declarations: [
    ModalComponent,
    ModalContentDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
