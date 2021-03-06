import { ClassUtil } from "../../shared/ClassUtil";
import { CommandResponse } from "../../shared/command/CommandResponse";
import { ICommand } from "../../shared/command/ICommand";
import { ICommandHandler } from "../../shared/command/ICommandHandler";
import { IDomainEvent } from "../../shared/domain/IDomainEvent";
import { UuidIdentity } from "../../shared/domain/UuidIdentity";
import { ITodoItemRepository } from "../domain/ITodoItemRepository";
import { TodoItem } from "../domain/TodoItem";
import { TodoItemDescription } from "../domain/TodoItemDescription";
import { ChangeItemDescriptionCommand } from "./ChangeItemDescriptionCommand";

export class ChangeItemDescriptionCommandHandler implements ICommandHandler {

  private _todoItemRepository: ITodoItemRepository;

  constructor(repository: ITodoItemRepository) {
    this._todoItemRepository = repository;
  }

  public handle(command: ChangeItemDescriptionCommand): CommandResponse {
    let item = this._todoItemRepository.get(new UuidIdentity(command.id));
    if (item) {
      let events: IDomainEvent[];
      try {
        [item, events] = item.setDescription(new TodoItemDescription(command.description));
        return CommandResponse.ack(item.getId().toString(), events);
      } catch (e) {
        return CommandResponse.nak((e as Error).message);
      }
    } else {
      return CommandResponse.nak("No TodoItem with ID " + command.id);
    }
  }

  public listenTo(): string {
    return ClassUtil.nameOf(ChangeItemDescriptionCommand);
  }

}
