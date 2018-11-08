import { IEntity } from "./IEntity";
import { IIdentity } from "./IIdentity";

export abstract class Entity<T extends IIdentity> implements IEntity<Entity<T>> {

  private _id: T;

  constructor(id: T) {
    this._id = id;
  }

  public getId(): T {
    return this._id;
  }

  public sameIdentityAs(other: Entity<T>): boolean {
    return this.getId().equals(other.getId());
  }

}
