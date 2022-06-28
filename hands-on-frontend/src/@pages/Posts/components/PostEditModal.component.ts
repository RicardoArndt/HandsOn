import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { IModalInitialize } from "../../../@components/Modal/Modal";
import { COMMAND_FACTORY_TOKEN, ICommandFactory } from "../models/CommandFactory";
import { IPost, IPostService, POST_SERVICE_TOKEN } from "../services/post.service";

@Component({
  selector: "hands-on-post-edit-modal",
  template: `
    <p class="typewriter">
      You are editing the <strong>{{ publication?.title }}</strong> publication.
    </p>

    <div class="container">
      <div class="prefix-lines">
        <span *ngFor="let prefix of prefixes">{{ prefix }}</span>
      </div>
      <textarea [(ngModel)]="value" (keyup)="onKeyUp($event)" #textArea></textarea>
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
  public publication!: IPost;

  constructor(
    @Inject(POST_SERVICE_TOKEN)
    private readonly postService: IPostService,
    @Inject(COMMAND_FACTORY_TOKEN)
    private readonly commandFactory: ICommandFactory
  ) { }

  public async onKeyUp(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;

    if (event.key.toLowerCase() != "enter") {
      return;
    }

    this.value = value;

    const command = this.commandFactory.getCommand(this);

    await command.executeAsync();
  }

  public async initialize(): Promise<void> {
    setTimeout(() => {
      this.prefixes.push("cmd ->");
    }, 3800);

    setTimeout(() => {
      this.textArea.nativeElement.focus();
    }, 4000);

    this.publication = await this.getPost();
  }

  private async getPost(): Promise<IPost> {
    return await this.postService.getPostById(this.id);
  }
}
