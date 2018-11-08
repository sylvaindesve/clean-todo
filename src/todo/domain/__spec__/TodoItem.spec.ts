import { IDomainEvent } from "../../../shared/IDomainEvent";
import { UuidIdentity } from "../../../shared/UuidIdentity";
import { TodoItem } from "../TodoItem";
import { TodoItemAdded } from "../TodoItemAdded";
import { TodoItemDescription } from "../TodoItemDescription";

describe("TodoItem", () => {

  it("can be created with an ID and a description", () => {
    const id = UuidIdentity.create();
    const description = new TodoItemDescription("This is a test");
    const [item, events]: [TodoItem, IDomainEvent[]] = TodoItem.create(id, description);

    expect(item.getId().equals(id)).toBeTruthy();
    expect(item.getDescription()!.sameValueAs(description)).toBeTruthy();
    expect(events.length).toBe(1);
    expect(events[0] instanceof TodoItemAdded).toBeTruthy();
  });

});
