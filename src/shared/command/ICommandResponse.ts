import { IDomainEvent } from "../domain/IDomainEvent";

export interface ICommandResponse {

  getValue(): any;
  hasEvents(): boolean;
  getEvents(): IDomainEvent[];

}
