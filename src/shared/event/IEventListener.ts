import { IDomainEvent } from "../domain/IDomainEvent";

export interface IEventListener {
  handle(event: IDomainEvent): void;
}
