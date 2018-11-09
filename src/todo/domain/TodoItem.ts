import { Entity } from "../../shared/domain/Entity";
import { IAggregateRoot } from "../../shared/domain/IAggregateRoot";
import { IDomainEvent } from "../../shared/domain/IDomainEvent";
import { UuidIdentity } from "../../shared/domain/UuidIdentity";
import { TodoItemAdded } from "./TodoItemAdded";
import { TodoItemDescription } from "./TodoItemDescription";

// TodoItem is an Aggregate Root
export class TodoItem extends Entity<UuidIdentity> implements IAggregateRoot {

  public static create(id: UuidIdentity, description: TodoItemDescription): [TodoItem, IDomainEvent[]] {
    const event = new TodoItemAdded(id, description.descriptionString);
    const newTodoItem = new TodoItem(id);
    return [newTodoItem.apply(event), [event]];
  }

  private _description: TodoItemDescription | null = null;

  public getDescription(): TodoItemDescription | null {
    return this._description;
  }

  public apply(event: IDomainEvent): TodoItem {
    if (event instanceof TodoItemAdded) {
      this._description = new TodoItemDescription((event as TodoItemAdded).getDescription());
    }
    return this;
  }

}
