import { Guid } from "../../shared/Guid";
import { IValueObject } from "../../shared/IValueObject";

export class TodoItemId implements IValueObject<TodoItemId> {

  public static generate(): TodoItemId {
    return new TodoItemId(Guid.newGuid());
  }

  constructor(
    public readonly idString: string,
  ) {
    if ( !Guid.guidRegExp.test(idString)) {
      throw new TypeError("Not a valid GUID");
    }
  }

  public sameValueAs(other: TodoItemId): boolean {
    return this.idString === other.idString;
  }

}
