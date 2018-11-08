import { ICommand } from "../../shared/ICommand";

export class AddItem implements ICommand {

  constructor(
    public readonly description: string,
  ) {}

}
