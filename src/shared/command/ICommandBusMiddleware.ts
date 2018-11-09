import { ICommand } from "./ICommand";
import { ICommandResponse } from "./ICommandResponse";

export interface ICommandBusMiddleware {

  dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse;

}
