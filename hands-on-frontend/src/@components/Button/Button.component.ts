import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "hands-on-button",
  styleUrls: ["./Button.scss"],
  template: `
    <button class="btn" (click)="click()" [type]="type">{{ name }}</button>
  `
})
export class ButtonComponent {
  @Input() public name: string = "";
  @Input() public type: "button" | "submit" = "button";
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  public click() {
    this.onClick.emit();
  }
}
