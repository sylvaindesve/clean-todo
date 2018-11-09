import { IDomainEvent } from "../shared/domain/IDomainEvent";
import { IIdentity } from "../shared/domain/IIdentity";
import { UuidIdentity } from "../shared/domain/UuidIdentity";
import { IEventStore } from "../shared/event/IEventStore";
import { ITodoItemRepository } from "../todo/domain/ITodoItemRepository";
import { TodoItem } from "../todo/domain/TodoItem";

export class InMemoryEventStore implements IEventStore, ITodoItemRepository {

  private _storedEvent: Map<string, IDomainEvent[]>;

  constructor() {
    this._storedEvent = new Map<string, IDomainEvent[]>();
  }

  public store(events: IDomainEvent[]): void {
    events.forEach((e) => {
      if (!this._storedEvent.has(e.getId().toString())) {
        this._storedEvent.set(e.getId().toString(), []);
      }
      this._storedEvent.get(e.getId().toString())!.push(e);
    });
  }

  public get(id: UuidIdentity): TodoItem {
    if (!this._storedEvent.has(id.toString())) {
      throw new Error("not found");
    }
    const events = this._storedEvent.get(id.toString());
    const todoItem = new TodoItem(id);
    events!.forEach((e) => {
      todoItem.apply(e);
    });
    return todoItem;
  }

  public getStoredEvents(): Map<string, IDomainEvent[]> {
    return this._storedEvent;
  }

}
