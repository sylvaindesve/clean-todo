import { IDomainEvent } from "../domain/IDomainEvent";
import { ICommandResponse } from "./ICommandResponse";

export class CommandResponse implements ICommandResponse {

  public static withValue(value: any, events?: IDomainEvent[]): CommandResponse {
    const newResponse = new CommandResponse();
    newResponse._value = value;
    if (events !== null) { newResponse._events = events!; }
    return newResponse;
  }

  private _value: any = null;
  private _events: IDomainEvent[] = [];

  public getValue(): any {
    return this._value;
  }

  public hasEvents(): boolean {
    return this._events.length > 0;
  }

  public getEvents(): IDomainEvent[] {
    return this._events;
  }

}
