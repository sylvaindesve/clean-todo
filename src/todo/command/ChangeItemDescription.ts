import { ICommand } from "../../shared/command/ICommand";

export class ChangeItemDescription implements ICommand {

  constructor(
    public readonly id: string,
    public readonly description: string,
  ) {}

}
