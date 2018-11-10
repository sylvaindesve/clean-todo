import { IDomainEvent } from "../domain/IDomainEvent";
import { CommandResponseStatus } from "./CommandResponseStatus";
import { ICommandResponse } from "./ICommandResponse";

export class CommandResponse implements ICommandResponse {

  public static ack(value: any, events?: IDomainEvent[]): CommandResponse {
    const newResponse = new CommandResponse();
    newResponse._status = CommandResponseStatus.ACK;
    newResponse._value = value;
    if (events !== null) { newResponse._events = events!; }
    return newResponse;
  }

  public static nak(value: any): CommandResponse {
    const newResponse = new CommandResponse();
    newResponse._status = CommandResponseStatus.NAK;
    newResponse._value = value;
    return newResponse;
  }

  private _status: CommandResponseStatus = CommandResponseStatus.ACK;
  private _value: any = null;
  private _events: IDomainEvent[] = [];

  public getStatus(): CommandResponseStatus {
    return this._status;
  }

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
