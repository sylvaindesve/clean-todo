import { ClassUtil } from "../shared/ClassUtil";
import { IDomainEvent } from "../shared/domain/IDomainEvent";
import { IEventListener } from "../shared/event/IEventListener";
import { IQuery } from "../shared/query/IQuery";
import { IQueryHandler } from "../shared/query/IQueryHandler";
import { IReadModel } from "../shared/query/IReadModel";
import { TodoItemAddedEvent } from "../todo/domain/TodoItemAddedEvent";
import { TodoItemDescriptionChangedEvent } from "../todo/domain/TodoItemDescriptionChangedEvent";
import { GetAllTodoItemsQuery } from "../todo/query/GetAllTodoItemsQuery";
import { TodoItemListReadModel } from "../todo/query/TodoItemListReadModel";
import { TodoItemReadModel } from "../todo/query/TodoItemReadModel";

export class InMemoryStore implements IEventListener {

  public getAllTodoItems: IQueryHandler = Object.assign((query: IQuery) => {
    return new TodoItemListReadModel(Array.from(this._store.values()));
  }, { listenTo: ClassUtil.nameOf(GetAllTodoItemsQuery) });

  private _store: Map<string, TodoItemReadModel> = new Map<string, TodoItemReadModel>();

  public handle(event: IDomainEvent) {
    if (event instanceof TodoItemAddedEvent) {
      const todoItemAddedEvent = event as TodoItemAddedEvent;
      this._store.set(
        todoItemAddedEvent.getId().toString(),
        new TodoItemReadModel(
          todoItemAddedEvent.getId().toString(),
          todoItemAddedEvent.getDescription(),
        ),
      );
    }
    if (event instanceof TodoItemDescriptionChangedEvent) {
      const todoItemDescriptionChangedEvent = event as TodoItemDescriptionChangedEvent;
      const storedItem = this._store.get(todoItemDescriptionChangedEvent.getId().toString());
      this._store.set(
        todoItemDescriptionChangedEvent.getId().toString(),
        Object.assign(storedItem, { description: todoItemDescriptionChangedEvent.getDescription() }),
      );
    }
  }

}
