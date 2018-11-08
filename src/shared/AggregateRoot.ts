import { IDomainEvent } from "./IDomainEvent";
import { UuidIdentity } from "./UuidIdentity";

// Inpsired from https://github.com/gregoryyoung/m-r/blob/master/SimpleCQRS/Domain.cs
export abstract class AggregateRoot {

  private readonly _id: UuidIdentity;
  private readonly _uncommittedEvents: IDomainEvent[] = [];

  constructor(id: UuidIdentity) {
    this._id = id;
  }

  public getId(): UuidIdentity {
    return this._id;
  }

  public getUncommittedEvents(): IDomainEvent[] {
    return this._uncommittedEvents;
  }

  public commitEvents(): void {
    this._uncommittedEvents.length = 0;
  }

  public loadFromEvents(events: IDomainEvent[]): void {
    events.forEach((event) => {
      this._applyEvent(event, false);
    });
  }

  protected abstract apply(event: IDomainEvent): void;

  protected applyEvent(event: IDomainEvent) {
    this._applyEvent(event, true);
  }

  private _applyEvent(event: IDomainEvent, isNew: boolean): void {
    this.apply(event);
    if (isNew) { this._uncommittedEvents.push(event); }
  }

}
