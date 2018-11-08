import { Entity } from "../../shared/Entity";
import { IDomainEvent } from "../../shared/IDomainEvent";
import { UuidIdentity } from "../../shared/UuidIdentity";
import { TodoItemAdded } from "./TodoItemAdded";
import { TodoItemDescription } from "./TodoItemDescription";

// TodoItem is an Aggregate Root
export class TodoItem extends Entity<UuidIdentity> {

  public static create(id: UuidIdentity, description: TodoItemDescription): [TodoItem, IDomainEvent[]] {
    const newTodoItem = new TodoItem(id);
    newTodoItem._description = description;
    return [newTodoItem, [new TodoItemAdded(id, description.descriptionString)]];
  }

  private _description: TodoItemDescription | null = null;

  public getDescription(): TodoItemDescription | null {
    return this._description;
  }

}
