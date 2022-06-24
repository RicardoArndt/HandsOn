export interface IBaseProps {
  prefixes: string[];
  value: string;
}

export class BaseConsole {
  constructor(
    public props: IBaseProps
  ) { }

  setMessageConsole(message: string): void {
    this.props.prefixes.push("cmd ->");
    this.props.value += `${message}\n`;
    this.props.prefixes.push("cmd ->");
  }
}
