import { IQuery } from "./IQuery";
import { IReadModel } from "./IReadModel";

export interface IQueryHandler {

  (query: IQuery): IReadModel | Error;

  listenTo: string;

}
