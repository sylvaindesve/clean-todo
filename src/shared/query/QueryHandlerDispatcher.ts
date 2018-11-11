import { ClassUtil } from "../ClassUtil";
import { IQuery } from "./IQuery";
import { IQueryBusMiddleware } from "./IQueryBusMiddleware";
import { IQueryHandler } from "./IQueryHandler";
import { IReadModel } from "./IReadModel";

export class QueryHandlerDispatcher implements IQueryBusMiddleware {

  private _handlers: Map<string, IQueryHandler> = new Map<string, IQueryHandler>();

  public registerHandler(handler: IQueryHandler): void {
    this._handlers.set(handler.listenTo(), handler);
  }

  public dispatch(query: IQuery, nextMiddleware?: IQueryBusMiddleware): IReadModel | Error {
    if (this._handlers.has(ClassUtil.nameOf(query))) {
      return this._handlers.get(ClassUtil.nameOf(query))!.execute(query);
    } else {
      throw new Error("no handler for " + ClassUtil.nameOf(query));
    }
  }

}
