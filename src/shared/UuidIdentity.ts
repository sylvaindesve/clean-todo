import * as validate from "uuid-validate";
import * as uuid from "uuid/v4";
import { IIdentity } from "./IIdentity";

// Inspired from https://gitlab.com/epinxteren/ts-eventsourcing
export class UuidIdentity implements IIdentity {

  public static create<T extends UuidIdentity>(this: new (id: string) => T): T {
    return new this(uuid());
  }

  public static of(id: IIdentity) {
    if (id instanceof this) {
      return id;
    }
    return new this((id as any).toString());
  }

  constructor(private readonly id: string) {
    if (!validate(id, 4)) {
      throw new TypeError("not a valid UUID");
    }
  }

  public toString() {
    return this.id;
  }

  public equals(id: IIdentity) {
    return this.id.toString() === id.toString();
  }
}
