import { IDomainEvent } from "../domain/IDomainEvent";
import { CommandResponseStatus } from "./CommandResponseStatus";

export interface ICommandResponse {

  getStatus(): CommandResponseStatus;
  getValue(): any;
  hasEvents(): boolean;
  getEvents(): IDomainEvent[];

}
