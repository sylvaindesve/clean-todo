import { IDomainEvent } from "../../shared/IDomainEvent";
import { UuidIdentity } from "../../shared/UuidIdentity";

export class TodoItemAdded implements IDomainEvent {

  constructor(
    public readonly id: UuidIdentity,
    public readonly description: string,
  ) {}

}
