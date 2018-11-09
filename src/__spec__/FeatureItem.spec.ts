import { CommandBus } from "../shared/command/CommandBus";
import { CommandHandlerDispatcher } from "../shared/command/CommandHandlerDispatcher";
import { UuidIdentity } from "../shared/domain/UuidIdentity";
import { EventDispatcher } from "../shared/event/EventDispatcher";
import { AddItem } from "../todo/command/AddItem";
import { AddItemHandler } from "../todo/command/AddItemHandler";
import { ChangeItemDescription } from "../todo/command/ChangeItemDescription";
import { ChangeItemDescriptionHandler } from "../todo/command/ChangeItemDescriptionHandler";
import { InMemoryEventStore } from "./InMemoryEventStore";

describe("Item features", () => {

  let eventStore: InMemoryEventStore;
  let commandDispatcher: CommandHandlerDispatcher;
  let bus: CommandBus;

  beforeEach(() => {
    eventStore = new InMemoryEventStore();

    commandDispatcher = new CommandHandlerDispatcher();
    commandDispatcher.registerHandler(new AddItemHandler());
    commandDispatcher.registerHandler(new ChangeItemDescriptionHandler(eventStore));

    bus = new CommandBus([
      new EventDispatcher(eventStore),
      commandDispatcher,
    ]);
  });

  test("An item can be added", () => {
    const id = bus.handle(new AddItem("A new item")).getValue();
    const item = eventStore.get(new UuidIdentity(id));
    expect(item.getDescription()!.descriptionString).toEqual("A new item");
  });

  test("The description of an item can be changed", () => {
    const id = bus.handle(new AddItem("A new item")).getValue();
    bus.handle(new ChangeItemDescription(id.toString(), "Description changed"));
    const item = eventStore.get(new UuidIdentity(id));
    expect(item.getDescription()!.descriptionString).toEqual("Description changed");
  });

});
