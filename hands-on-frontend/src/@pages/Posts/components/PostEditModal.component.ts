import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { IModalInitialize } from "../../../@components/Modal/Modal";

@Component({
  selector: "hands-on-post-edit-modal",
  template: `
    <p class="typewriter">
      You are editing the Command Pattern post.
    </p>

    <div class="container">
      <div class="prefix-lines">
        <span *ngFor="let prefix of prefixes">{{ prefix }}</span>
      </div>
      <textarea [value]="value" #textArea></textarea>
    </div>
  `,
  styleUrls: ["./PostEditModal.scss"]
})
export class PostEditModalComponent implements IModalInitialize {
  @Input()
  public id: string = "";

  @ViewChild("textArea")
  public textArea!: ElementRef;

  public prefixes: string[] = [];

  public value: string = "";

  initialize(): void {
    setTimeout(() => {
      this.prefixes.push("cmd ->");
    }, 3800);

    setTimeout(() => {
      this.textArea.nativeElement.focus();
    }, 4000);
  }
}
