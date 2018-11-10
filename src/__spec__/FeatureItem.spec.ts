import { CommandBus } from "../shared/command/CommandBus";
import { CommandHandlerDispatcher } from "../shared/command/CommandHandlerDispatcher";
import { UuidIdentity } from "../shared/domain/UuidIdentity";
import { EventDispatcher } from "../shared/event/EventDispatcher";
import { AddItemCommand } from "../todo/command/AddItemCommand";
import { AddItemCommandHandler } from "../todo/command/AddItemCommandHandler";
import { ChangeItemDescriptionCommand } from "../todo/command/ChangeItemDescriptionCommand";
import { ChangeItemDescriptionCommandHandler } from "../todo/command/ChangeItemDescriptionCommandHandler";
import { InMemoryEventStore } from "./InMemoryEventStore";

describe("Item features", () => {

  let eventStore: InMemoryEventStore;
  let commandDispatcher: CommandHandlerDispatcher;
  let bus: CommandBus;

  beforeEach(() => {
    eventStore = new InMemoryEventStore();

    commandDispatcher = new CommandHandlerDispatcher();
    commandDispatcher.registerHandler(new AddItemCommandHandler());
    commandDispatcher.registerHandler(new ChangeItemDescriptionCommandHandler(eventStore));

    bus = new CommandBus([
      new EventDispatcher(eventStore),
      commandDispatcher,
    ]);
  });

  test("An item can be added", () => {
    const id = bus.handle(new AddItemCommand("A new item")).getValue();
    const item = eventStore.get(new UuidIdentity(id));
    expect(item.getDescription()!.descriptionString).toEqual("A new item");
  });

  test("The description of an item can be changed", () => {
    const id = bus.handle(new AddItemCommand("A new item")).getValue();
    bus.handle(new ChangeItemDescriptionCommand(id.toString(), "Description changed"));
    const item = eventStore.get(new UuidIdentity(id));
    expect(item.getDescription()!.descriptionString).toEqual("Description changed");
  });

});
