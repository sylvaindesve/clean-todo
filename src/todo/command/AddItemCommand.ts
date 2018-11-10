import { ICommand } from "../../shared/command/ICommand";

export class AddItemCommand implements ICommand {

  constructor(
    public readonly description: string,
  ) {}

}
