// Interface for all Value Objects
export interface IValueObject<T> {

  sameValueAs(other: T): boolean;

}
