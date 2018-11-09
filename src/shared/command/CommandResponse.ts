import { IDomainEvent } from "../IDomainEvent";
import { ICommandResponse } from "./ICommandResponse";

export class CommandResponse implements ICommandResponse {

  constructor(
    public readonly value: any,
    public readonly events: IDomainEvent[],
  ) {}

}
