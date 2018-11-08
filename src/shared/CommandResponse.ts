import { ICommandResponse } from "./ICommandResponse";
import { IDomainEvent } from "./IDomainEvent";

export class CommandResponse implements ICommandResponse {

  constructor(
    public readonly value: any,
    public readonly events: IDomainEvent[],
  ) {}

}
