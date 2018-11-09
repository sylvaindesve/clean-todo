import { ClassUtil } from "../../shared/ClassUtil";
import { CommandResponse } from "../../shared/command/CommandResponse";
import { ICommand } from "../../shared/command/ICommand";
import { ICommandHandler } from "../../shared/command/ICommandHandler";
import { IDomainEvent } from "../../shared/domain/IDomainEvent";
import { UuidIdentity } from "../../shared/domain/UuidIdentity";
import { ITodoItemRepository } from "../domain/ITodoItemRepository";
import { TodoItem } from "../domain/TodoItem";
import { TodoItemDescription } from "../domain/TodoItemDescription";
import { ChangeItemDescription } from "./ChangeItemDescription";

export class ChangeItemDescriptionHandler implements ICommandHandler {

  private _todoItemRepository: ITodoItemRepository;

  constructor(repository: ITodoItemRepository) {
    this._todoItemRepository = repository;
  }

  public handle(command: ChangeItemDescription): CommandResponse {
    let item = this._todoItemRepository.get(new UuidIdentity(command.id));
    let events: IDomainEvent[];
    [item, events] = item.setDescription(new TodoItemDescription(command.description));
    return CommandResponse.withValue(item.getId().toString(), events);
  }

  public listenTo(): string {
    return ClassUtil.nameOf(ChangeItemDescription);
  }

}
