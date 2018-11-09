// tslint:disable:max-classes-per-file
import { ICommand } from "./ICommand";
import { ICommandBusMiddleware } from "./ICommandBusMiddleware";
import { ICommandResponse } from "./ICommandResponse";

export class CommandBus {
  private middlewareChain: ICommandBusMiddleware;

  constructor(private readonly middlewares: ICommandBusMiddleware[]) {
    this.middlewareChain = this.createMiddlewareChain(middlewares);
  }

  public handle(command: ICommand): ICommandResponse {
    return this.middlewareChain.dispatch(command);
  }

  private createMiddlewareChain(middlewares: ICommandBusMiddleware[]): ICommandBusMiddleware {
    return this.middlewares.reduceRight((last, middleware) => {
      return (new class implements ICommandBusMiddleware {
        public dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse {
          return middleware.dispatch(command, last);
        }
      }());
    });
  }

}
