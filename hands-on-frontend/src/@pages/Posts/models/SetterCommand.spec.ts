import { ISetterProps, Setter, SetterCommand } from "./SetterCommand";

describe("SetterCommand", () => {
  it("should return invalid set command", async () => {
    const props: ISetterProps = {
      prefixes: [],
      publication: {
        code: 0,
        description: "",
        id: "",
        priority: 0,
        tags: [],
        title: ""
      },
      value: "set description != abc\n"
    };
    const setter = new SetterCommand(new Setter(props, props.value));

    await setter.executeAsync();

    expect(props.value).toBe("set description != abc\ninvalid set command\n");
  });

  it("should set property description", async () => {
    const props: ISetterProps = {
      prefixes: [],
      publication: {
        code: 0,
        description: "",
        id: "",
        priority: 0,
        tags: [],
        title: ""
      },
      value: "set description=abc\n"
    };
    const setter = new SetterCommand(new Setter(props, props.value));

    await setter.executeAsync();

    expect(props.value).toBe("set description=abc\nproperty description has been setted abc\n");
    expect(props.publication.description).toBe("abc");
  });

  it("should set property description", async () => {
    const props: ISetterProps = {
      prefixes: [],
      publication: {
        code: 0,
        description: "",
        id: "",
        priority: 0,
        tags: [],
        title: ""
      },
      value: "set description=abc\nset code=10\n"
    };
    const setter = new SetterCommand(new Setter(props, "set code=10"));

    await setter.executeAsync();

    expect(props.value).toBe("set description=abc\nset code=10\nproperty code has been setted 10\n");
    expect(props.publication.description).toBe("");
    expect(props.publication.code).toBe(10);
  });

  it("should return propery does not exists", async () => {
    const props: ISetterProps = {
      prefixes: [],
      publication: {
        code: 0,
        description: "",
        id: "",
        priority: 0,
        tags: [],
        title: ""
      },
      value: "set command=abc\n"
    };
    const setter = new SetterCommand(new Setter(props, props.value));

    await setter.executeAsync();

    expect(props.value).toBe("set command=abc\npropery command does not exists\n");
  });
});
