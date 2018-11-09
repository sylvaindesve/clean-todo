import { ICommand } from "../../shared/command/ICommand";

export class AddItem implements ICommand {

  constructor(
    public readonly description: string,
  ) {}

}
