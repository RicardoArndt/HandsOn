import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <hands-on-header></hands-on-header>

    <main>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </main>
  `
})
export class AppComponent { }
