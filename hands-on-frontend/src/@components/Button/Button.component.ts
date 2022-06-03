import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "hands-on-button",
  styleUrls: ["./Button.scss"],
  template: `
    <button class="btn" (click)="click()" [type]="type">
      <span *ngIf="name">{{ name }}</span>
      <span *ngIf="icon" class="material-icons">{{ icon }}</span>
    </button>
  `
})
export class ButtonComponent {
  @Input() public name: string = "";
  @Input() public type: "button" | "submit" = "button";
  @Input() public icon: string = "";
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  public click() {
    this.onClick.emit();
  }
}
