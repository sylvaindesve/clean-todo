import { IDomainEvent } from "../domain/IDomainEvent";
import { ICommandResponse } from "./ICommandResponse";

export class CommandResponse implements ICommandResponse {

  constructor(
    public readonly value: any,
    public readonly events: IDomainEvent[],
  ) {}

}
