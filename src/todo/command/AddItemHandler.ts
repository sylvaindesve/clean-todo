import { ClassUtil } from "../../shared/ClassUtil";
import { CommandResponse } from "../../shared/command/CommandResponse";
import { ICommand } from "../../shared/command/ICommand";
import { ICommandHandler } from "../../shared/command/ICommandHandler";
import { UuidIdentity } from "../../shared/domain/UuidIdentity";
import { TodoItem } from "../domain/TodoItem";
import { TodoItemDescription } from "../domain/TodoItemDescription";
import { AddItem } from "./AddItem";

export class AddItemHandler implements ICommandHandler {

  public handle(command: AddItem): CommandResponse {
    const id = UuidIdentity.create();
    const [newTodoItem, events] = TodoItem.create(id, new TodoItemDescription(command.description));
    return CommandResponse.withValue(id.toString(), events);
  }

  public listenTo(): string {
    return ClassUtil.nameOf(AddItem);
  }

}
