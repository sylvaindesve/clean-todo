import { IEntity } from "../../shared/IEntity";
import { TodoItemDescription } from "./TodoItemDescription";
import { TodoItemId } from "./TodoItemId";

export class TodoItem implements IEntity<TodoItem> {

  private todoItemId: TodoItemId;
  private todoItemDescription: TodoItemDescription;

  constructor(todoItemId: TodoItemId, todoItemDescription: TodoItemDescription) {
    this.todoItemId = todoItemId;
    this.todoItemDescription = todoItemDescription;
  }

  public getId(): TodoItemId {
    return this.todoItemId;
  }

  public getDescription(): TodoItemDescription {
    return this.todoItemDescription;
  }

  public sameIdentityAs(other: TodoItem): boolean {
    return this.todoItemId.sameValueAs(other.todoItemId);
  }

}
