import { ClassUtil } from "../ClassUtil";
import { ICommand } from "./ICommand";
import { ICommandBusMiddleware } from "./ICommandBusMiddleware";
import { ICommandHandler } from "./ICommandHandler";
import { ICommandResponse } from "./ICommandResponse";

export class CommandHandlerDispatcher implements ICommandBusMiddleware {

  private _handlers: Map<string, ICommandHandler> = new Map<string, ICommandHandler>();

  public registerHandler(handler: ICommandHandler): void {
    this._handlers.set(handler.listenTo(), handler);
  }

  public dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse {
    if (this._handlers.has(ClassUtil.nameOf(command))) {
      return this._handlers.get(ClassUtil.nameOf(command))!.handle(command);
    } else {
      throw new Error("no handler for " + ClassUtil.nameOf(command));
    }
  }

}
