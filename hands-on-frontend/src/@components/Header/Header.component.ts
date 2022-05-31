import { Component } from "@angular/core";

@Component({
  selector: "hands-on-header",
  styleUrls: ["./Header.scss"],
  template: `
    <header>
      <img src="../assets/Logo.svg" alt="HandsON" />

      <ul>
        <li>
          <a routerLink="/" routerLinkActive="active">
            <span class="material-icons">home</span>
            Home
          </a>
        </li>

        <li>
          <a routerLink="/posts" routerLinkActive="active">
            <span class="material-icons">post_add</span>
            Posts
          </a>
        </li>

        <li>
          <a routerLink="/users" routerLinkActive="active">
            <span class="material-icons">group</span>
            Usuários
          </a>
        </li>
      </ul>
    </header>
  `
})
export class HeaderComponent {

}
