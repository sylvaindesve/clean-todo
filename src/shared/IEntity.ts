// Interface for all Entities
export interface IEntity<T> {

  sameIdentityAs(other: T): boolean;

}
