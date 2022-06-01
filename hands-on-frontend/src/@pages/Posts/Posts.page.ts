import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  template: `
    <div class="page">
      <div class="actions">
        <hands-on-button name="Novo" (onClick)="goToNewPost()"></hands-on-button>
      </div>
      <h1>Hello</h1>
    </div>
  `,
  styleUrls: ["./Posts.scss"]
})
export class PostsPage {
  constructor(
    private readonly router: Router
  ) { }

  public goToNewPost(): void {
    this.router.navigate(["posts", "newpost"]);
  }
}
