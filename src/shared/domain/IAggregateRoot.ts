
import { IDomainEvent } from "./IDomainEvent";

export interface IAggregateRoot {

  apply(event: IDomainEvent): IAggregateRoot;

}
