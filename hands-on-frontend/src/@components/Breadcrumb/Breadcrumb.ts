export interface IBreadcrumb {
  icon: string;
  name: string;
  titlePage: string;
}

export class Breadcrumb implements IBreadcrumb {
  constructor(
    public icon: string = "",
    public name: string = "",
    public titlePage: string = ""
  ) { }

  public static NoBreadcrumb(): IBreadcrumb {
    return new Breadcrumb();
  }
}
