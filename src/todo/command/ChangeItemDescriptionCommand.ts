import { ICommand } from "../../shared/command/ICommand";

export class ChangeItemDescriptionCommand implements ICommand {

  constructor(
    public readonly id: string,
    public readonly description: string,
  ) {}

}
