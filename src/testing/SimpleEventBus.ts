import { IDomainEvent } from "../shared/domain/IDomainEvent";
import { IEventBus } from "../shared/event/IEventBus";
import { IEventListener } from "../shared/event/IEventListener";

// A too simple bus
export class SimpleEventBus implements IEventBus {

  private _listeners: IEventListener[] = [];

  public suscribe(listener: IEventListener): void {
    this._listeners.push(listener);
  }

  public publish(events: IDomainEvent[]): void {
    events.forEach((e) => {
      this._listeners.forEach((l) => {
        l.handle(e);
      });
    });
  }

}
