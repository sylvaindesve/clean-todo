import { IQuery } from "./IQuery";
import { IReadModel } from "./IReadModel";

export interface IQueryHandler {

  execute(query: IQuery): IReadModel | Error;

}
