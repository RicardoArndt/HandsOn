export interface IBreadcrumb {
  icon: string;
  name: string;
  titlePage: string;
}

export interface IBreadcrumbChildren {
  data: { [key: string | symbol]: { title?: string; icon?: string, name?: string } };
  url: { path: string }[];
  children: IBreadcrumbChildren[];
}

export interface IBreadcrumbData {
  getIcon(): string;
  getName(): string;
  getUrl(): string;
  getTitle(): string;
  getChildrenData(): IBreadcrumbData | null;
}

export interface IBreadcrumbItem {
  icon: string;
  name: string;
  title: string;
  url: string;
  isActive: boolean;
  hasNext: boolean;
}

export class BreadcrumbItem implements IBreadcrumbItem {
  constructor(
    public icon: string,
    public name: string,
    public title: string,
    public url: string,
    public isActive: boolean,
    public hasNext: boolean
  ) { }
}

export class BreadcrumbData implements IBreadcrumbData {
  private data: { title?: string; icon?: string; name?: string } | undefined;
  private url: string = "";
  private children: IBreadcrumbData | null = null;

  public static build(
      children: IBreadcrumbChildren,
      config: { url: string }
  ): IBreadcrumbData | null {
    if (!children) {
        return null;
    }

    const result = new BreadcrumbData();
    result.data = children.data["breadcrumb"];
    result.url = `${config.url}/${children.url.map(u => u.path).join('/')}`;
    result.children = BreadcrumbData.build(children.children[0], { url: result.url });

    return result as IBreadcrumbData;
  }

  public getIcon(): string {
    return this.data?.icon ?? "";
  }

  public getName(): string {
    return this.data?.name ?? "";
  }

  public getUrl(): string {
    return this.url;
  }

  public getTitle(): string {
    return this.data?.title ?? "";
  }

  public getChildrenData(): IBreadcrumbData | null {
    if (!this.children) {
        return null;
    }

    return Object.assign(this.children, {}) as IBreadcrumbData;
  }
}

export class BreadcrumbBuilder {
  public static build(breadcrumbData: IBreadcrumbData | null): IBreadcrumbItem[] {
    const breadcrumb = new Breadcrumb();
    this.extractChildren(breadcrumb, breadcrumbData);
    return breadcrumb.getItens();
  }

  private static extractChildren(breadcrumb: Breadcrumb, breadcrumbData: IBreadcrumbData | null): void {
    if (breadcrumbData == null) {
      return;
    }

    const title = breadcrumbData.getTitle();
    const name = breadcrumbData.getName();
    const icon = breadcrumbData.getIcon();
    const url = breadcrumbData.getUrl();

    breadcrumb.addItem(icon, title, url, name);

    if (breadcrumbData.getChildrenData()) {
        this.extractChildren(breadcrumb, breadcrumbData.getChildrenData());
    }
  }
}

export class Breadcrumb {
  private itens: IBreadcrumbItem[] = [];

  public addItem(
    icon: string,
    title: string,
    url: string,
    name: string
  ): void {
    const item = this.itens.find(i => i.title === title);

    if (item) {
        return;
    }

    this.itens = this.itens.map(i => ({ ...i, isActive: false, hasNext: true }));

    this.itens.push(new BreadcrumbItem(icon, name, title, url, true, false));
  }

  public getItens(): IBreadcrumbItem[] {
    return [...this.itens];
  }
}
