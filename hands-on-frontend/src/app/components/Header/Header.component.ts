import { Component } from "@angular/core";

@Component({
  selector: "hands-on-header",
  styleUrls: ["./Header.scss"],
  template: `
    <header>
      <img src="../assets/Logo.svg" alt="HandsON" />

      <ul>
        <li>
          <a routerLink="/">
            <span class="material-icons">home</span>
            Home
          </a>
        </li>

        <li>
          <a routerLink="/posts" routerLinkActive="active">
            <span class="material-icons">post_add</span>
            Publicações
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
