import { Entity } from "../../shared/domain/Entity";
import { IAggregateRoot } from "../../shared/domain/IAggregateRoot";
import { IDomainEvent } from "../../shared/domain/IDomainEvent";
import { UuidIdentity } from "../../shared/domain/UuidIdentity";
import { TodoItemAddedEvent } from "./TodoItemAddedEvent";
import { TodoItemDescription } from "./TodoItemDescription";
import { TodoItemDescriptionChangedEvent } from "./TodoItemDescriptionChangedEvent";

// TodoItem is an Aggregate Root
export class TodoItem extends Entity<UuidIdentity> implements IAggregateRoot {

  public static create(id: UuidIdentity, description: TodoItemDescription): [TodoItem, IDomainEvent[]] {
    const event = new TodoItemAddedEvent(id, description.descriptionString);
    const newTodoItem = new TodoItem(id);
    return [newTodoItem.apply(event), [event]];
  }

  private _description: TodoItemDescription | null = null;

  public getDescription(): TodoItemDescription | null {
    return this._description;
  }

  public setDescription(description: TodoItemDescription): [TodoItem, IDomainEvent[]] {
    const event = new TodoItemDescriptionChangedEvent(this.getId(), description.descriptionString);
    return [this.apply(event), [event]];
  }

  public apply(event: IDomainEvent): TodoItem {
    if (event instanceof TodoItemAddedEvent) {
      this._description = new TodoItemDescription((event as TodoItemAddedEvent).getDescription());
    }
    if (event instanceof TodoItemDescriptionChangedEvent) {
      this._description = new TodoItemDescription((event as TodoItemDescriptionChangedEvent).getDescription());
    }
    return this;
  }

}
