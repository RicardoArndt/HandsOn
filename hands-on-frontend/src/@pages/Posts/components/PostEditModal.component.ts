import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { IModalInitialize } from "../../../@components/Modal/Modal";

@Component({
  selector: "hands-on-post-edit-modal",
  template: `
    <p class="typewriter">
      You are editing the Command Pattern post.
    </p>

    <textarea [value]="value" #textArea></textarea>
  `,
  styleUrls: ["./PostEditModal.scss"]
})
export class PostEditModalComponent implements IModalInitialize {
  @Input()
  public id: string = "";

  @ViewChild("textArea")
  public textArea!: ElementRef;

  public value: string = "";

  initialize(): void {
    setTimeout(() => {
      this.value += "cmd -> ";
    }, 3800);

    setTimeout(() => {
      this.textArea.nativeElement.focus();
    }, 4000);
  }
}
