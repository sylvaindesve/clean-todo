import { UuidIdentity } from "../../../shared/UuidIdentity";
import { TodoItem } from "../TodoItem";
import { TodoItemDescription } from "../TodoItemDescription";

describe("TodoItem", () => {

  it("can be created with an ID and a description", () => {
    const id = UuidIdentity.create();
    const description = new TodoItemDescription("This is a test");
    const item: TodoItem = TodoItem.create(id, description);

    expect(item.getId().equals(id)).toBeTruthy();
    expect(item.getDescription()!.sameValueAs(description)).toBeTruthy();
    expect(item.getUncommittedEvents().length).toBe(1);
  });

});
