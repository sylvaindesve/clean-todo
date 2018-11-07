import { Guid } from "../../shared/Guid";
import { TodoItemId } from "./TodoItemId";

describe("TodoItemId", () => {

  it("cannot be created with a non-GUID string", () => {
    expect(() => {
      // tslint:disable-next-line:no-unused-expression
      new TodoItemId("some-invalid-GUID");
    }).toThrow(TypeError);
  });

  it("can be generated", () => {
    const id: TodoItemId = TodoItemId.generate();
    expect(Guid.guidRegExp.test(id.idString)).toBeTruthy();
  });

});
