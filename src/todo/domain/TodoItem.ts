import { AggregateRoot } from "../../shared/AggregateRoot";
import { IDomainEvent } from "../../shared/IDomainEvent";
import { IEntity } from "../../shared/IEntity";
import { UuidIdentity } from "../../shared/UuidIdentity";
import { TodoItemAdded } from "./TodoItemAdded";
import { TodoItemDescription } from "./TodoItemDescription";

export class TodoItem extends AggregateRoot<UuidIdentity> implements IEntity<TodoItem> {

  public static create(id: UuidIdentity, description: TodoItemDescription) {
    const newTodoItem = new TodoItem(id);
    newTodoItem.applyEvent(new TodoItemAdded(id, description.descriptionString));
    return newTodoItem;
  }

  private _description: TodoItemDescription | null = null;

  public getDescription(): TodoItemDescription | null {
    return this._description;
  }

  public sameIdentityAs(other: TodoItem): boolean {
    return this.getId().equals(other.getId());
  }

  // Never call this one as it is called by `applyEvent`
  protected apply(event: IDomainEvent): void {
    if (event instanceof TodoItemAdded) {
      this._description = new TodoItemDescription((event as TodoItemAdded).description);
    }
  }

}
