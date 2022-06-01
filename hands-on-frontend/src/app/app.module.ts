import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HomeModule } from "../@pages/Home/Home.module";
import { HeaderModule } from "../@components/Header/Header.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BreacrumbModule } from "../@components/Breadcrumb/Breadcrumb.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    HomeModule,
    BreacrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
