import { ICommand } from "./ICommand";
import { ICommandResponse } from "./ICommandResponse";

export interface ICommandHandler {

  handle(command: ICommand): ICommandResponse;

  listenTo(): string;

}
