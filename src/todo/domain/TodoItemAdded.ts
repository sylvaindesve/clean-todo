import { IDomainEvent } from "../../shared/domain/IDomainEvent";
import { IIdentity } from "../../shared/domain/IIdentity";
import { UuidIdentity } from "../../shared/domain/UuidIdentity";

export class TodoItemAdded implements IDomainEvent {

  private _id: UuidIdentity;
  private _description: string;

  constructor(
    id: UuidIdentity,
    description: string,
  ) {
    this._id = id;
    this._description = description;
  }

  public getId(): IIdentity {
    return this._id;
  }

  public getDescription(): string {
    return this._description;
  }

}
