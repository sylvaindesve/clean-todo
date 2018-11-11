// tslint:disable:max-classes-per-file
import { IQuery } from "./IQuery";
import { IQueryBus } from "./IQueryBus";
import { IQueryBusMiddleware } from "./IQueryBusMiddleware";
import { IReadModel } from "./IReadModel";

export class QueryBus implements IQueryBus {
  private middlewareChain: IQueryBusMiddleware;

  constructor(private readonly middlewares: IQueryBusMiddleware[]) {
    this.middlewareChain = this.createMiddlewareChain(middlewares);
  }

  public dispatch(query: IQuery): IReadModel | Error {
    return this.middlewareChain.dispatch(query);
  }

  private createMiddlewareChain(middlewares: IQueryBusMiddleware[]): IQueryBusMiddleware {
    return this.middlewares.reduceRight((last, middleware) => {
      return (new class implements IQueryBusMiddleware {
        public dispatch(query: IQuery, nextMiddleware?: IQueryBusMiddleware): IReadModel | Error {
          return middleware.dispatch(query, last);
        }
      }());
    });
  }

}
