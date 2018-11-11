import { IQuery } from "./IQuery";
import { IReadModel } from "./IReadModel";

export interface IQueryBusMiddleware {

  dispatch(query: IQuery, nextMiddleware?: IQueryBusMiddleware): IReadModel | Error;

}
