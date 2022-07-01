import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "hands-on-input",
  styleUrls: ["./Input.scss"],
  template: `
    <div class="input">
      <input />
      <span class="material-icons">
        search
        </span>
    </div>
  `
})
export class InputComponent {

}
