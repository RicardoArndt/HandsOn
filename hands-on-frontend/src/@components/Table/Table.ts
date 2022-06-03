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
  column: TableValue | TableValue[];
}

export class TableValue {
  constructor(
    public readonly value: string | number = "",
    public readonly type: TableColumnType | null = null,
    public readonly icon: string = ""
  ) { }
}

export enum TableColumnType {
  Button = 0
}
