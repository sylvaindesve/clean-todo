import { IQuery } from "./IQuery";
import { IReadModel } from "./IReadModel";

export interface IQueryBus {

  dispatch(query: IQuery): IReadModel | Error;

}
