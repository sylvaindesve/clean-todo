import { CommandBus } from "../shared/command/CommandBus";
import { CommandHandlerDispatcher } from "../shared/command/CommandHandlerDispatcher";
import { UuidIdentity } from "../shared/domain/UuidIdentity";
import { EventDispatcher } from "../shared/event/EventDispatcher";
import { QueryBus } from "../shared/query/QueryBus";
import { QueryHandlerDispatcher } from "../shared/query/QueryHandlerDispatcher";
import { InMemoryEventStore } from "../testing/InMemoryEventStore";
import { InMemoryStore } from "../testing/InMemoryStore";
import { SimpleEventBus } from "../testing/SimpleEventBus";
import { AddItemCommand } from "../todo/command/AddItemCommand";
import { AddItemCommandHandler } from "../todo/command/AddItemCommandHandler";
import { ChangeItemDescriptionCommand } from "../todo/command/ChangeItemDescriptionCommand";
import { ChangeItemDescriptionCommandHandler } from "../todo/command/ChangeItemDescriptionCommandHandler";
import { GetAllTodoItemsQuery } from "../todo/query/GetAllTodoItemsQuery";
import { TodoItemListReadModel } from "../todo/query/TodoItemListReadModel";

describe("Item features", () => {

  let eventStore: InMemoryEventStore;
  let eventBus: SimpleEventBus;
  let commandDispatcher: CommandHandlerDispatcher;
  let bus: CommandBus;
  let store: InMemoryStore;
  let queryDispatcher: QueryHandlerDispatcher;
  let queryBus: QueryBus;

  beforeEach(() => {
    eventStore = new InMemoryEventStore();
    eventBus = new SimpleEventBus();

    commandDispatcher = new CommandHandlerDispatcher();
    commandDispatcher.registerHandler(new AddItemCommandHandler());
    commandDispatcher.registerHandler(new ChangeItemDescriptionCommandHandler(eventStore));

    bus = new CommandBus([
      new EventDispatcher(eventStore, eventBus),
      commandDispatcher,
    ]);

    store = new InMemoryStore();
    eventBus.suscribe(store);
    queryDispatcher = new QueryHandlerDispatcher();
    queryDispatcher.registerHandler(store.getAllTodoItems);

    queryBus = new QueryBus([
      queryDispatcher,
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

  test("All items can be fetched", () => {
    bus.handle(new AddItemCommand("Description for item 1"));
    const id2 = bus.handle(new AddItemCommand("Description for item 2")).getValue();
    bus.handle(new AddItemCommand("Description for item 3"));
    bus.handle(new ChangeItemDescriptionCommand(id2.toString(), "Description for item 2 changed"));

    const allItems = queryBus.dispatch(new GetAllTodoItemsQuery());
    expect(allItems instanceof TodoItemListReadModel).toBeTruthy();
    expect((allItems as TodoItemListReadModel).items.length).toEqual(3);
    const descriptions = (allItems as TodoItemListReadModel).items.map((i) => i.description);
    expect(descriptions).toContain("Description for item 1");
    expect(descriptions).toContain("Description for item 2 changed");
    expect(descriptions).toContain("Description for item 3");
    expect(descriptions).not.toContain("Description for item 2");
  });

});
