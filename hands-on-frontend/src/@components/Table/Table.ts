export interface ITableHeadElement {
  name: string;
}

export interface ITableBodyElement {
  rows: ITableRow[];
}

export interface ITableRow {
  columns: ITableColumn[];
}

export interface ITableColumn {
  value: string | number;
}
