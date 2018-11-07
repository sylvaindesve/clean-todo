import { TodoItem } from "../TodoItem";
import { TodoItemDescription } from "../TodoItemDescription";
import { TodoItemId } from "../TodoItemId";

describe("TodoItem", () => {

  it("can be created with an ID and a description", () => {
    const item: TodoItem = new TodoItem(TodoItemId.generate(), new TodoItemDescription("Some item"));
    expect(item.getDescription().sameValueAs(new TodoItemDescription("Some item"))).toBeTruthy();
  });

});
