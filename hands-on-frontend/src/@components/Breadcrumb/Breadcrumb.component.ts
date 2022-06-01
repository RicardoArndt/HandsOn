import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, Observable, of } from "rxjs";
import { Breadcrumb, IBreadcrumb } from "./Breadcrumb";

@Component({
  selector: "hands-on-breadcrumb",
  styleUrls: ["./Breadcrumb.scss"],
  template: `
    <h1>{{(breadcrumbs$[breadcrumbs$.length - 1] | async)?.titlePage}}</h1>
    <div>
      <div
        class="breadcrumb"
        *ngFor="let breadcrumb$ of breadcrumbs$; let i=index"
        [ngClass]="{'active': breadcrumbActive(i)}">
        <span class="material-icons">{{(breadcrumb$ | async)?.icon}}</span>
        <span>{{(breadcrumb$ | async)?.name}}</span>
        <span *ngIf="showArrowNext(i)">></span>
      </div>
    </div>
  `
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs$: Observable<IBreadcrumb>[] = [of(Breadcrumb.NoBreadcrumb())];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.startBreadcrumbs();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.startBreadcrumbs();
    });
  }

  public showArrowNext(currentIndex: number): boolean {
    return this.breadcrumbs$.length > 1 && currentIndex < (this.breadcrumbs$.length - 1);
  }

  public breadcrumbActive(currentIndex: number): boolean {
    return currentIndex === (this.breadcrumbs$.length - 1);
  }

  private startBreadcrumbs() {
    this.breadcrumbs$ = [];

    this.breadcrumbs$[0] = this.activatedRoute.data.pipe(
      map(data => new Breadcrumb(
        data["breadcrumb"]?.icon,
        data["breadcrumb"]?.name,
        data["breadcrumb"]?.titlePage)));

    this.activatedRoute.children.map(children =>
      this.breadcrumbs$.push(
        children.data.pipe(map(data => new Breadcrumb(
          data["breadcrumb"]?.icon,
          data["breadcrumb"]?.name,
          data["breadcrumb"]?.titlePage)))));
  }
}
