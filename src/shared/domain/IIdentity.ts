// Inspired from https://gitlab.com/epinxteren/ts-eventsourcing
export interface IIdentity {

  toString(): string;

  equals(id: IIdentity): boolean;

}
