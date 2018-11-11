import { IDomainEvent } from "../domain/IDomainEvent";
import { IEventListener } from "./IEventListener";

export interface IEventBus {

  suscribe(listener: IEventListener): void;

  publish(events: IDomainEvent[]): void;

}
