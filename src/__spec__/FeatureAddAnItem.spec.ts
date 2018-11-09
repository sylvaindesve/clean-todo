import { CommandBus } from "../shared/command/CommandBus";
import { CommandHandlerDispatcher } from "../shared/command/CommandHandlerDispatcher";
import { UuidIdentity } from "../shared/domain/UuidIdentity";
import { EventDispatcher } from "../shared/event/EventDispatcher";
import { AddItem } from "../todo/command/AddItem";
import { AddItemHandler } from "../todo/command/AddItemHandler";
import { InMemoryEventStore } from "./InMemoryEventStore";

describe("Add an item", () => {
  it("adds an item", () => {
    const commandDispatcher = new CommandHandlerDispatcher();
    commandDispatcher.registerHandler(new AddItemHandler());

    const eventStore = new InMemoryEventStore();

    const bus = new CommandBus([
      new EventDispatcher(eventStore),
      commandDispatcher,
    ]);

    const id = bus.handle(new AddItem("A new item")).getValue();
    const item = eventStore.get(new UuidIdentity(id));
    expect(item.getDescription()!.descriptionString).toEqual("A new item");
  });
});
