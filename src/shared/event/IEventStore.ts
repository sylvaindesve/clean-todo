import { IDomainEvent } from "../domain/IDomainEvent";
import { IIdentity } from "../domain/IIdentity";

// Secondary/Driven port
export interface IEventStore {
  store(events: IDomainEvent[]): void;
}
