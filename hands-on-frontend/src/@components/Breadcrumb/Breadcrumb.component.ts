import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, Observable, of } from "rxjs";
import { BreadcrumbBuilder, BreadcrumbData, IBreadcrumbChildren, IBreadcrumbItem } from "./Breadcrumb";

@Component({
  selector: "hands-on-breadcrumb",
  styleUrls: ["./Breadcrumb.scss"],
  template: `
    <h1>{{ title$ | async }}</h1>
    <div>
      <div
        class="breadcrumb"
        *ngFor="let breadcrumb of (breadcrumbs$ | async); let i=index"
        [ngClass]="{'active': breadcrumb.isActive}">

        <a [routerLink]="breadcrumb.url">
          <span class="material-icons">{{ breadcrumb?.icon }}</span>
          <span class="name">{{ breadcrumb?.name }}</span>
        </a>
        <span *ngIf="breadcrumb?.hasNext">></span>
      </div>
    </div>
  `
})
export class BreadcrumbComponent implements OnInit {
  public title$: Observable<string> = of("");
  public breadcrumbs$: Observable<IBreadcrumbItem[]> = of();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const breadcrumbs$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((_) => {
        const child = this.activatedRoute.root.firstChild?.snapshot;
        const breadcrumbData = BreadcrumbData.build(child as IBreadcrumbChildren, { url: '' });
        return BreadcrumbBuilder.build(breadcrumbData);
      }));

    this.breadcrumbs$ = breadcrumbs$;

    this.title$ = this.getTitle();
  }

  private getTitle(): Observable<string> {
    if (!this.breadcrumbs$) {
      return of("");
    }

    return this.breadcrumbs$.pipe(map(breadcrumbs => breadcrumbs[breadcrumbs.length - 1]?.title));
  }
}
