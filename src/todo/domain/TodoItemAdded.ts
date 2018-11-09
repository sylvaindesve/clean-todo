import { IDomainEvent } from "../../shared/domain/IDomainEvent";
import { UuidIdentity } from "../../shared/domain/UuidIdentity";

export class TodoItemAdded implements IDomainEvent {

  constructor(
    public readonly id: UuidIdentity,
    public readonly description: string,
  ) {}

}
