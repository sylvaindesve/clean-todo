import { IIdentity } from "./IIdentity";

export interface IDomainEvent {
  getId(): IIdentity;
}
