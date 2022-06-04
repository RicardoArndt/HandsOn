import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { IModalInitialize } from "../../../@components/Modal/Modal";
import { IPost, IPostService, POST_SERVICE_TOKEN } from "../services/post.service";

@Component({
  selector: "hands-on-post-edit-modal",
  template: `
    <p class="typewriter">
      You are editing the <strong>{{ post.title }}</strong> post.
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
  public post!: IPost;

  constructor(
    @Inject(POST_SERVICE_TOKEN)
    private readonly postService: IPostService
  ) { }

  async initialize(): Promise<void> {
    setTimeout(() => {
      this.value += "cmd -> ";
    }, 3800);

    setTimeout(() => {
      this.textArea.nativeElement.focus();
    }, 4000);

    this.post = await this.getPost();
  }

  private async getPost(): Promise<IPost> {
    return await firstValueFrom(this.postService.getPostById(this.id));
  }
}
