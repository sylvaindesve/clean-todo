import { TodoItemDescription } from "./TodoItemDescription";

describe("TodoItemDescription", () => {

  it("cannot be created with an empty description string", () => {
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new TodoItemDescription("");
    }).toThrow(TypeError);
  });

  it("cannot be created with a description string longer than 100 chars",
      () => {
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new TodoItemDescription("This is a rather lenghty description and should\
        not be accepted as a valid description for a todo item");
    }).toThrow(TypeError);
  });

});
