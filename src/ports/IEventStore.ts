import { IDomainEvent } from "../shared/domain/IDomainEvent";

// Secondary/Driven port
export interface IEventStore {
  store(events: IDomainEvent[]): void;
}
