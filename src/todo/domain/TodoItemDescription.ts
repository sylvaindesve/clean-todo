import { IValueObject } from "../../shared/IValueObject";

// Description of a Todo item
export class TodoItemDescription implements IValueObject<TodoItemDescription> {

  constructor(
    public readonly descriptionString: string,
  ) {
    if ( descriptionString.length === 0 ) {
      throw new TypeError("description should not be empty");
    }
    if ( descriptionString.length > 100 ) {
      throw new TypeError("description should not be longer than 100 chars");
    }
  }

  public sameValueAs(other: TodoItemDescription): boolean {
    return this.descriptionString === other.descriptionString;
  }

}
